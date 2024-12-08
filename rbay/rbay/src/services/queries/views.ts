import { client } from "$services/redis";
import { itemsKey, itemsbyViewsKey } from "$services/keys";

export const incrementView = async (itemId: string, userId: string) => {
    return Promise.all([
        client.hIncrBy(itemsKey(itemId), 'views', 1),
        client.zIncrBy(itemsbyViewsKey(), 1, itemId)
    ])
};
