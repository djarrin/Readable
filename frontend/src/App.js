import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as ReadableAPI from './Utils/ReadableAPI';
import {addPost} from "./Actions/Posts";

class App extends Component {

    componentWillMount = () => {
        const { store } = this.props
        ReadableAPI.getAllPosts().then(res => {console.log(res)})
    }
    addPost = () => {
        let timestamp = Date.now();
        this.props.store.dispatch(addPost({
            id: 'fdafsf',
            timestamp: timestamp,
            body: 'this is the body',
            author: 'this is the title',
            category: 'category',
            title: 'this is the title'
        }))
    }
    render() {
        return (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
              <p>click the button below to add a post</p>
              <button onClick={this.addPost}>Click here</button>
          </div>
        );
  }
}

export default App;
