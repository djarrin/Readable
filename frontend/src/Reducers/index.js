import { combineReducers } from 'redux';
import {
    ADD_POST,
    DELETE_POST,
    EDIT_POST
} from '../Actions/Posts';

const initialState = {
    sunday: {
        breakfast: null,
        lunch: null,
        dinner: null
    },
    monday: {
        breakfast: null,
        lunch: null,
        dinner: null
    },
    tuesday: {
        breakfast: null,
        lunch: null,
        dinner: null
    },
    wednesday: {
        breakfast: null,
        lunch: null,
        dinner: null
    },
    thursday: {
        breakfast: null,
        lunch: null,
        dinner: null
    },
    friday: {
        breakfast: null,
        lunch: null,
        dinner: null
    },
    saturday: {
        breakfast: null,
        lunch: null,
        dinner: null
    }
};

function posts(state = initialState, action) {
    const {id, timestamp, body, author, parentId, newTitle, newBody} = action;

    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
               'id': id,
               'timestamp': timestamp,
               'body': body,
               'author': author,
               'parentId': parentId
            }

        default:
            return state
    }
}

export default combineReducers({
    posts
});