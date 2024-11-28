import 'dotenv/config';
import { client } from '../src/services/redis';

const run = async () => {
    /*
    await client.hSet("car", {
        color: "red",
        build: 1950
    })

    const car = await client.hGetAll("car")

    if(Object.keys(car).length == 0){
        console.log("Car not found")
        return
    }

    console.log(car)
    */

    // BUILDING PIPELINE

    await client.hSet("car1", {
        color: "red",
        build: 1950
    })
    await client.hSet("car2", {
        color: "green",
        build: 1955
    })
    await client.hSet("car3", {
        color: "blue",
        build: 1960
    })

    const commands = [1,2,3].map((id) => {
        return client.hGetAll("car" + id)
    })
    const results = await Promise.all(
        commands
    )

    // const results = await Promise.all([
    //     client.hGetAll("car1"),
    //     client.hGetAll("car2"),
    //     client.hGetAll("car3")
    // ])

    console.log(results)
};
run();
