export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

export function addComment({timestamp, body, author, parentId}) {
    return {
        type: ADD_COMMENT,
        timestamp,
        body,
        author,
        parentId
    }
}

export function editComment({id, timestamp, body}) {
    return {
        type: EDIT_COMMENT,
        id,
        timestamp,
        body
    }
}

export function deleteComment({id}) {
    return {
        type: DELETE_COMMENT,
        id
    }
}