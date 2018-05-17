export const ADD_POST = 'ADD_POST';
export const ADD_INTIAL_STATE_POST = 'ADD_INTIAL_STATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_POST = 'EDIT_POST';
export const UP_VOTE_POST = 'UP_VOTE_POST';
export const DOWN_VOTE_POST = 'DOWN_VOTE_POST';

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

export function upVotePostUI({id, voteScore}) {
    return {
        type: UP_VOTE_POST,
        id,
        voteScore
    }
}

export function downVotePostUI({id, voteScore}) {
    return {
        type: DOWN_VOTE_POST,
        id,
        voteScore
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