export const ADD_POST = 'ADD_POST';
export const ADD_INTIAL_STATE_POST = 'ADD_INTIAL_STATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_POST = 'EDIT_POST';

export function addPost({id, timestamp, body, author, category, title}) {
    return {
        type: ADD_POST,
        id,
        timestamp,
        body,
        author,
        category,
        title
    }

}

export function addInitialStatePost({id, timestamp, body, author, category, title, commentCount, deleted, voteScore}) {
    return {
        type: ADD_INTIAL_STATE_POST,
        id,
        timestamp,
        body,
        author,
        category,
        title,
        commentCount,
        deleted,
        voteScore
    }
}

export function deletePost({id}) {
    return {
        type: DELETE_POST,
        id
    }
}

export function editPost({id, newTitle, newBody}) {
    return {
        type: EDIT_POST,
        id,
        newTitle,
        newBody
    }
}