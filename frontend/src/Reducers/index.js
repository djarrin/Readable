import { combineReducers } from 'redux';
import {
    ADD_INTIAL_STATE_POST,
    ADD_POST,
    DELETE_POST, DOWN_VOTE_POST,
    EDIT_POST,
    UP_VOTE_POST
} from '../Actions/Posts';
import {CHANGE} from '../Actions/Modal';
import {ADD_INITIAL_STATE_CATEGORIES} from '../Actions/Categories';
import {ADD_COMMENT, DELETE_COMMENT} from "../Actions/Comments";

//reducer to change all post states
function posts(state = [], action) {
    const {id, timestamp, body, author, category, title, commentCount, deleted, voteScore, newTitle, newBody, parentId} = action;

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
                voteScore: 1
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
            });
        case EDIT_POST:
            return state.map((post) => {
                if(post.id === id) {
                    post.title = newTitle;
                    post.body = newBody;
                }
                return post;
            })
        case ADD_COMMENT:
            return state.map((post) => {
                if(post.id === parentId) {
                    post.commentCount = post.commentCount + 1;
                }
                return post;
            })
        case DELETE_COMMENT:
            return state.map((post) => {
                if(post.id === parentId) {
                    post.commentCount = post.commentCount - 1;
                }
                return post;
            })
        default:
            return state
    }
}

//reducer to change all category states
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

//reducer to change modal state
function modal(state = {openState: false, postID: null}, action) {
    const {openState, postID} = action;

    switch (action.type) {
        case CHANGE:
            return {
                ...state,
                openState: openState,
                postID: postID
            };
        default:
            return state;
    }
}

export default combineReducers({
    posts,
    category,
    modal
});