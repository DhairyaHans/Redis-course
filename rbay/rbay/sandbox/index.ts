import 'dotenv/config';
import { client } from '../src/services/redis';

const run = async () => {
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
};
run();
