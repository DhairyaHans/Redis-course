import type { CreateItemAttrs } from '$services/types';

export const serialize = (attrs: CreateItemAttrs, userId: string) => {
    return {
        ...attrs,
        createdAt: attrs.createdAt.toMillis(),
        endingAt: attrs.endingAt.toMillis(),
        userId: userId
    }
};
