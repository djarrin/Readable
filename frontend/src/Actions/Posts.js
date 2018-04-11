export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_POST = 'EDIT_POST';

export function addPost({id, timestamp, body, author, parentId}) {
    return {
        type: ADD_POST,
        id,
        timestamp,
        body,
        author,
        parentId
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