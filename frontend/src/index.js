import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './Reducers'
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import * as asyncInitialState from 'redux-async-initial-state';
import { combineReducers } from 'redux';
import * as ReadableAPI from './Utils/ReadableAPI';

// We need outerReducer to replace full state as soon as it loaded
const reducer = asyncInitialState.outerReducer(combineReducers({
    ...reducers,
    // We need innerReducer to store loading state, i.e. for showing loading spinner
    // If you don't need to handle loading state you may skip it
    asyncInitialState: asyncInitialState.innerReducer,
}));

// Load state function
// Should return promise that resolves application state
const loadStore = () => {
    return new Promise(resolve => {
        ReadableAPI.getAllPosts()
            .then(response => response)
            .then(resolve);
    });
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose;

const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(asyncInitialState.middleware(loadStore))
    )
);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root')

);
registerServiceWorker();
