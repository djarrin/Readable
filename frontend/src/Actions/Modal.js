export const CHANGE = 'CHANGE';
export const ADD_INITIAL_MODAL_STATE = 'ADD_INITIAL_MODAL_STATE';

export function changeModalState({openState, postID}) {
    return {
        type: CHANGE,
        openState,
        postID
    }
}
