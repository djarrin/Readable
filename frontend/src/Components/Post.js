import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import FontAwsome from 'react-fontawesome';
import * as ReadableAPI from '../Utils/ReadableAPI';
import { connect } from 'react-redux';
import {downVotePostUI, upVotePostUI, deletePost} from '../Actions/Posts';

class Post extends Component {
    static propTypes = {
        post: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    upVote = () => {
        ReadableAPI.upVotePost(this.props.post.id).then(response => {
            let voteScore = response.voteScore;
            let data = {
                id: response.id,
                voteScore: voteScore
            }
            this.props.dispatch(upVotePostUI(data));
        })
    }

    downVote = () => {
        ReadableAPI.downVotePost(this.props.post.id).then(response => {
            let voteScore = response.voteScore;
            let data = {
                id: response.id,
                voteScore: voteScore
            }
            this.props.dispatch(downVotePostUI(data));
        })
    }

    deletePost = () => {
        ReadableAPI.deletePost(this.props.post.id).then((res) => {
            let data = {
                id: res.id
            }
            this.props.dispatch(deletePost(data))
        })
    }

    render() {
        const {post} = this.props;
        return (
            <li className={"post"} key={post.id}>
                <div className={"post-header"}>
                    <div className={"align-left"}>
                        <h3 className={"post-title"}>{post.title}</h3> <FontAwsome name="chevron-right"/> <span className={"post-category"}>{post.category}</span>
                        <div className={"post-date"}>{dateFormat(post.timestamp, 'mmmm d, yyyy')}</div>
                    </div>
                    <div className={"align-right"}>
                        <div className={"post-author"}>{post.author}</div>
                        <FontAwsome name={"times-circle"} className={"deleteButton"} size={"2x"} onClick={this.deletePost}/>
                    </div>
                </div>
                <div className={"post-body"}>
                    <p className={"post-body-text"}>{post.body}</p>
                </div>
                <div className={"post-footer"}>
                    <div className={"vote-score"}>
                        {post.voteScore}
                        <FontAwsome name="thumbs-up" className={"thumbs-up-icon"} onClick={this.upVote}/>
                        <FontAwsome name="thumbs-down" className={"thumbs-down-icon"} onClick={this.downVote}/>
                    </div>
                    <div className={"comment"}>{post.commentCount}<FontAwsome name="comment" className={"comment-icon"}/> Comment</div>
                </div>
            </li>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        upVote: (data) => dispatch(upVotePostUI(data)),
        downVote: (data) => dispatch(downVotePostUI(data)),
        deletePost: (data) => dispatch(deletePost(data))
    }
}

export default connect(
    mapDispatchToProps
)(Post)