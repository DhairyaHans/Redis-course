export const pageCacheKey = (id: String) => `pagecache#${id}`
export const usersKey = (userId: String) => `users#${userId}`
export const sessionsKey = (sessionId: String) => `sessions#${sessionId}`
export const usernamesUniqueKey = () => 'usernames:unique'
export const usersLikesKey = (userId: String) => `users:likes#${userId}`
export const usernamesKey = () => `usernames`

// Items
export const itemsKey = (itemId: String) => `items#${itemId}`
export const itemsbyViewsKey = () => 'items:views'
export const itemsByEndingAtKey = () => 'items:endingAt'