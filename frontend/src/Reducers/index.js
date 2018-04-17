import { combineReducers } from 'redux';
import {
    ADD_INTIAL_STATE_POST,
    ADD_POST,
    DELETE_POST,
    EDIT_POST
} from '../Actions/Posts';

// const initialState = [
//     {
//         author: "thingtwo",
//         body: "Everyone says so after all.",
//         category: "react",
//         commentCount: 2,
//         deleted: false,
//         id: "8xf0y6ziyjabvozdd253nd",
//         timestamp: 1467166872634,
//         title: "Udacity is the best place to learn React",
//         voteScore: 6
//     },
//     {
//         author: "thingone",
//         body: "Just kidding, It takes more than 10 minutes to learn technology",
//         category: "redux",
//         commentCount: 0,
//         deleted: false,
//         id: "6ni6ok3ym7mf1p33lnez",
//         timestamp: 1468479767190,
//         title: "Learn Redux in 10 minutes!",
//         voteScore: -5
//     }
// ];

function posts(state = [], action) {
    const {id, timestamp, body, author, category, title, commentCount, deleted, voteScore} = action;

    switch (action.type) {
        case ADD_POST:
            return state.concat({
                author: author,
                body: body,
                category: category,
                commentCount: 0,
                deleted: false,
                id: id,
                timestamp: timestamp,
                title: title,
                voteScore: 0
            })
        case ADD_INTIAL_STATE_POST:
            return state.concat({
                author: author,
                id: id,
                timestamp: timestamp,
                body: body,
                category: category,
                title: title,
                commentCount: commentCount,
                deleted: deleted,
                voteScore: voteScore
            })


        default:
            return state
    }
}

export default combineReducers({
    posts
});