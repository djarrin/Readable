import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './Reducers'
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { combineReducers } from 'redux';
import * as ReadableAPI from './Utils/ReadableAPI';
import {addInitialStatePost} from "./Actions/Posts";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose;

const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(logger)
    )
);

ReactDOM.render(
    <Provider store={store}>
        <App store={store}/>
    </Provider>, document.getElementById('root')

);
registerServiceWorker();

//set up the initial state of the app
ReadableAPI.getAllPosts().then(res => res.forEach((p) => {
    store.dispatch(addInitialStatePost({
        id: p.id,
        author: p.author,
        body: p.body,
        category: p.category,
        commentCount: p.commentCount,
        deleted: p.deleted,
        timestamp: p.timestamp,
        title: p.title,
        voteScore: p.voteScore
    }))
}));
