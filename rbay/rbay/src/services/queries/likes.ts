import { client } from "$services/redis";
import { usersLikesKey, itemsKey } from "$services/keys";
import { getItems } from "./items";

export const userLikesItem = async (itemId: string, userId: string) => {
    return await client.sIsMember(usersLikesKey(userId), itemId)
};

export const likedItems = async (userId: string) => {
    const ids = await client.sMembers(usersLikesKey(userId))
    return getItems(ids)
};

export const likeItem = async (itemId: string, userId: string) => {
    const inserted = await client.SADD(usersLikesKey(userId), itemId)
    if (inserted)
        await client.hIncrBy(itemsKey(itemId), "likes", 1)

};

export const unlikeItem = async (itemId: string, userId: string) => {
    const removed = await client.SREM(usersLikesKey(userId), itemId)
    if (removed)
        await client.hIncrBy(itemsKey(itemId), "likes", -1)
};

export const commonLikedItems = async (userOneId: string, userTwoId: string) => {
    const ids = await client.sInter([usersLikesKey(userOneId), usersLikesKey(userTwoId)])
    return getItems(ids)
};
