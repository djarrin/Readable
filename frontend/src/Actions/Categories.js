export const ADD_INITIAL_STATE_CATEGORIES = 'ADD_INITIAL_STATE_CATEGORIES';

export function addInitialStateCategories({name, path}) {
    return {
        type: ADD_INITIAL_STATE_CATEGORIES,
        name,
        path
    }
}