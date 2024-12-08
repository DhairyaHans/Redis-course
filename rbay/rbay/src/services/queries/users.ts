import type { CreateUserAttrs } from '$services/types';
import { genId } from '$services/utils';
import { client } from '$services/redis';
import { usersKey, usernamesUniqueKey, usernamesKey } from '$services/keys';

export const getUserByUsername = async (username: string) => {
    // Use the username argument to look up the person ID
    // from the sorted set
    const decimalId = await client.zScore(usernamesKey(), username)
    
    // check if we actually got some user ID from the sorted set
    if (!decimalId){
        throw new Error('User does not exist')
    }

    // convert the integer(Base 10) ID to hexadecimal (Base 16)
    const hexID = decimalId.toString(16)

    // Take the ID to look into the user's hash
    const user = await client.hGetAll(usersKey(hexID))

    // Deserialize the user Hash and return it
    return deserialize(hexID, user)
};

export const getUserById = async (id: string) => {
    const user = await client.hGetAll(usersKey(id))
    return deserialize(id, user)
};

export const createUser = async (attrs: CreateUserAttrs) => {
    const id = genId()

    /*
        Check if username already exists in the set of usernames
        If so, throw an error
        Otherwise Continue
    */

    const exists = await client.sIsMember(usernamesUniqueKey(), attrs.username)
    if (exists){
        throw new Error("Username is taken")
    }

    await client.hSet( usersKey(id), serialize(attrs))
    await client.SADD(usernamesUniqueKey(), attrs.username)
    await client.zAdd(usernamesKey(), {
        value: attrs.username,
        score: parseInt(id, 16)  // Convert the hexadecimal id (Base 16) to Base 10 integer 
    })

    return id
};


const serialize = (user: CreateUserAttrs) => {
    return {
        username: user.username,
        password: user.password
    }
}

const deserialize = (id: string, user: { [key: string]: string }) => {
    return {
        id,
        username: user.username,
        password: user.password
    }
}