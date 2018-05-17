import { combineReducers } from 'redux';
import {
    ADD_INTIAL_STATE_POST,
    ADD_POST,
    DELETE_POST, DOWN_VOTE_POST,
    EDIT_POST,
    UP_VOTE_POST
} from '../Actions/Posts';
import {ADD_INITIAL_STATE_CATEGORIES} from '../Actions/Categories';


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
        case DELETE_POST:
            return state.filter((post) => {
                if(post.id !== id) {
                    return post;
                }
            });
        case UP_VOTE_POST:
        case DOWN_VOTE_POST:
            return state.map((post) => {
                if(post.id === id) {
                    post.voteScore = voteScore;
                }
                return post;
            })

        default:
            return state
    }
}

function category(state = [], action) {
    const {name, path} = action;

    switch (action.type) {
        case ADD_INITIAL_STATE_CATEGORIES:
            return state.concat({
                name: name,
                path: path
            });
        default:
            return state;
    }
}

export default combineReducers({
    posts,
    category
});