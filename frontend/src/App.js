import React, { Component } from 'react';
import './App.css';
import { Route, withRouter } from 'react-router-dom'
import {addPost} from "./Actions/Posts";
import { connect } from 'react-redux'
import MainNav from "./Components/MainNav";
import Post from './Components/Post';
import Modal from 'react-modal';
import PostForm from './Components/PostForm';
import sortBy from 'sort-by';
import { Button } from 'reactstrap';
import FontAwsome from 'react-fontawesome'
import {changeModalState} from "./Actions/Modal";
import PostDetail from "./Components/PostDetail";


class App extends Component {

    state = {
        allTimeSort: '-timestamp',
        allVoteSort: '-voteScore',
        allSort: '-timestamp',
        allTimeSelected: false,
        allVoteSelected: false,
        reactTimeSort: '-timestamp',
        reactVoteSort: '-voteScore',
        reactSort: '-timestamp',
        reactTimeSelected: false,
        reactVoteSelected: false,
        reduxTimeSort: '-timestamp',
        reduxVoteSort: '-voteScore',
        reduxeSort: '-timestamp',
        reduxTimeSelected: false,
        reduxVoteSelected: false,
        udacityTimeSort: '-timestamp',
        udacityVoteSort: '-voteScore',
        udacitySort: '-timestamp',
        udacityTimeSelected: false,
        udacityVoteSelected: false
    }

    componentWillMount() {
        //binds Modal to the body
        Modal.setAppElement('body');
    }

    //Responsible for toggling state that sorts posts by time
    timeSortToggle = (category) => {
        const {allTimeSort, reactTimeSort, reduxTimeSort, udacityTimeSort} = this.state;
        switch (category) {
            case 'all':
                if(allTimeSort === '-timestamp') {
                    this.setState({
                        allTimeSort: 'timestamp',
                        allSort: 'timestamp'
                    })
                } else {
                    this.setState({
                        allTimeSort: '-timestamp',
                        allSort: '-timestamp'
                    })
                }
                this.setState({
                    allTimeSelected: true,
                    allVoteSelected:false
                })
                break;
            case 'udacity':
                if(udacityTimeSort === '-timestamp') {
                    this.setState({
                        udacityTimeSort: 'timestamp',
                        udacitySort: 'timestamp'
                    })
                } else {
                    this.setState({
                        udacityTimeSort: '-timestamp',
                        udacitySort: '-timestamp'
                    })
                }
                this.setState({
                    udacityTimeSelected: true,
                    udacityVoteSelected:false
                })
                break;
            case 'react':
                if(reactTimeSort === '-timestamp') {
                    this.setState({
                        reactTimeSort: 'timestamp',
                        reactSort: 'timestamp'
                    })
                } else {
                    this.setState({
                        reactTimeSort: '-timestamp',
                        reactSort: '-timestamp'
                    })
                }
                this.setState({
                    reactTimeSelected: true,
                    reactVoteSelected:false
                })
                break;
            case 'redux':
                if(reduxTimeSort === '-timestamp') {
                    this.setState({
                        reduxTimeSort: 'timestamp',
                        reduxSort: 'timestamp'
                    })
                } else {
                    this.setState({
                        reduxTimeSort: '-timestamp',
                        reduxSort: '-timestamp'
                    })
                }
                this.setState({
                    reduxTimeSelected: true,
                    reduxVoteSelected:false
                })
                break;
        }
    }

    //Responsible for toggling state that sorts posts by vote score
    voteSortToggle = (category) => {
        const {allVoteSort, reactVoteSort, reduxVoteSort, udacityVoteSort} = this.state;
        switch (category) {
            case 'all':
                if(allVoteSort === '-voteScore') {
                    this.setState({
                        allVoteSort: 'voteScore',
                        allSort: 'voteScore'
                    })
                } else {
                    this.setState({
                        allVoteSort: '-voteScore',
                        allSort: '-voteScore'
                    })
                }
                this.setState({
                    allVoteSelected: true,
                    allTimeSelected:false
                })
                break;
            case 'udacity':
                if(udacityVoteSort === '-voteScore') {
                    this.setState({
                        udacityVoteSort: 'voteScore',
                        udacitySort: 'voteScore'
                    })
                } else {
                    this.setState({
                        udacityVoteSort: '-voteScore',
                        udacitySort: '-voteScore'
                    })
                }
                this.setState({
                    udacityVoteSelected: true,
                    udacityTimeSelected:false
                })
                break;
            case 'react':
                if(reactVoteSort === '-voteScore') {
                    this.setState({
                        reactVoteSort: 'voteScore',
                        reactSort: 'voteScore'
                    })
                } else {
                    this.setState({
                        reactVoteSort: '-voteScore',
                        reactSort: '-voteScore'
                    })
                }
                this.setState({
                    reactVoteSelected: true,
                    reactTimeSelected:false
                })
                break;
            case 'redux':
                if(reduxVoteSort === '-voteScore') {
                    this.setState({
                        reduxVoteSort: 'voteScore',
                        reduxSort: 'voteScore'
                    })
                } else {
                    this.setState({
                        reduxVoteSort: '-voteScore',
                        reduxSort: '-voteScore'
                    })
                }
                this.setState({
                    reduxVoteSelected: true,
                    reduxTimeSelected:false
                })
                break;
        }
    }

    //sends out the dispatch to add a new post
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

    //toggles state for modal
    closeModal = () => {
        let data = {
            openState: false
        }
        this.props.store.dispatch(changeModalState(data))
    }

    render() {
        const { category, posts, modal } = this.props;

        let allTimeChevron = this.state.allTimeSort === '-timestamp' ? <FontAwsome name={'chevron-down'}/>:<FontAwsome name={'chevron-up'}/>;
        let reactTimeChevron = this.state.reactTimeSort === '-timestamp' ? <FontAwsome name={'chevron-down'}/>:<FontAwsome name={'chevron-up'}/>;
        let reduxTimeChevron = this.state.reduxTimeSort === '-timestamp' ? <FontAwsome name={'chevron-down'}/>:<FontAwsome name={'chevron-up'}/>;
        let udacityTimeChevron = this.state.udacityTimeSort === '-timestamp' ? <FontAwsome name={'chevron-down'}/>:<FontAwsome name={'chevron-up'}/>;

        let allVoteChevron = this.state.allVoteSort === '-voteScore' ? <FontAwsome name={'chevron-down'}/>:<FontAwsome name={'chevron-up'}/>;
        let reactVoteChevron = this.state.reactVoteSort === '-voteScore' ? <FontAwsome name={'chevron-down'}/>:<FontAwsome name={'chevron-up'}/>;
        let reduxVoteChevron = this.state.reduxVoteSort === '-voteScore' ? <FontAwsome name={'chevron-down'}/>:<FontAwsome name={'chevron-up'}/>;
        let udacityVoteChevron = this.state.udacityVoteSort === '-voteScore' ? <FontAwsome name={'chevron-down'}/>:<FontAwsome name={'chevron-up'}/>;
        return (
          <div className="App">
              <Modal
                isOpen={modal.openState}
              >
                  <FontAwsome name={"times-circle"} className={"modalDeleteButton"} size={"2x"} onClick={this.closeModal}/>
                  <PostDetail/>
              </Modal>

              <Route exact path={"/"} render={() => (
                  <div>
                      <MainNav categories={category} active={"all"}/>
                      <PostForm defaultCat={"none"} type={'add'}/>
                      <div className={"sort-container"}>
                          <Button
                              className={"time-sort " + this.state.allTimeSelected}
                              onClick={() => this.timeSortToggle('all')}
                          >Sort By Time {allTimeChevron}</Button>
                          <Button
                              className={"vote-sort " + this.state.allVoteSelected}
                              onClick={() => this.voteSortToggle('all')}
                          >Sort By Vote {allVoteChevron}</Button>
                      </div>
                      <ul className={"posts-list"}>
                          {posts.sort(sortBy(this.state.allSort)).map((post) => (
                              <Post post={post} key={post.id}/>
                          ))}
                      </ul>
                  </div>
              )}/>
              <Route path={"/react"} render={() => (
                  <div>
                    <MainNav categories={category} active={"react"}/>
                      <PostForm defaultCat={"react"} type={'add'}/>
                      <div className={"sort-container"}>
                          <Button
                              className={"time-sort " + this.state.reactTimeSelected}
                              onClick={() => this.timeSortToggle('react')}
                          >Sort By Time {reactTimeChevron}</Button>
                          <Button
                              className={"vote-sort " + this.state.reactVoteSelected}
                              onClick={() => this.voteSortToggle('react')}
                          >Sort By Vote {reactVoteChevron}</Button>
                      </div>
                      <ul className={"posts-list"}>
                      {posts.sort(sortBy(this.state.reactSort)).filter((post) => {
                          if(post.category === 'react') {
                              return post;
                          }
                      }).map((post) => (
                          <Post post={post} key={post.id}/>
                      ))}
                      </ul>
                  </div>
              )}/>
              <Route path={"/redux"} render={() => (
                  <div>
                    <MainNav categories={category} active={"redux"}/>
                      <PostForm defaultCat={"redux"} type={'add'}/>
                      <div className={"sort-container"}>
                          <Button
                              className={"time-sort " + this.state.reduxTimeSelected}
                              onClick={() => this.timeSortToggle('redux')}
                          >Sort By Time {reduxTimeChevron}</Button>
                          <Button
                              className={"vote-sort " + this.state.reduxVoteSelected}
                              onClick={() => this.voteSortToggle('redux')}
                          >Sort By Vote {reduxVoteChevron}</Button>
                      </div>
                      <ul className={"posts-list"}>
                      {posts.sort(sortBy(this.state.reduxSort)).filter((post) => {
                          if(post.category === 'redux') {
                              return post;
                          }
                      }).map((post) => (
                          <Post post={post} key={post.id}/>
                      ))}
                      </ul>
                  </div>
              )}/>
              <Route path={"/udacity"} render={() => (
                  <div>
                    <MainNav categories={category} active={"udacity"}/>
                      <PostForm defaultCat={"udacity"} type={'add'}/>
                      <div className={"sort-container"}>
                          <Button
                              className={"time-sort " + this.state.udacityTimeSelected}
                              onClick={() => this.timeSortToggle('udacity')}
                          >Sort By Time {udacityTimeChevron}</Button>
                          <Button
                              className={"vote-sort " + this.state.udacityVoteSelected}
                              onClick={() => this.voteSortToggle('udacity')}
                          >Sort By Vote {udacityVoteChevron}</Button>
                      </div>
                      <ul className={"posts-list"}>
                      {posts.sort(sortBy(this.state.udacitySort)).filter((post) => {
                          if(post.category === 'udacity') {
                              return post;
                          }
                      }).map((post) => (
                          <Post post={post} key={post.id}/>
                      ))}
                      </ul>
                  </div>
              )}/>

          </div>
        );
  }
}

function mapStateToProps({posts, category, modal}) {
    return {
        posts: posts,
        category: category,
        modal: modal
    }
}
function mapDispatchToProps(dispatch) {
    return {
        closeModal: (data) => dispatch(changeModalState(data)),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App))
