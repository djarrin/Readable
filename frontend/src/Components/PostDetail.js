import React, { Component } from 'react';
import * as ReadableAPI from '../Utils/ReadableAPI';
import {connect} from "react-redux";
import PostForm from './PostForm';
import Comment from './Comment';
import CommentForm from './CommentForm';

class PostDetail extends Component {

    state = {
        post: null,
        postComments: []
    }

    componentWillMount = () => {
        const {postID} = this.props.modal;
        ReadableAPI.getSinglePost(this.props.modal.postID).then((res) => {
            this.setState({
                post: res
            })
        });
        ReadableAPI.getPostComments(postID).then((res) => {
            this.setState({
                postComments: res
            })
        })
    }

    /**
     * Adjusts state for new comment
     * @param comment
     */
    addComment = (comment) => {
        this.setState( (state) => ({
            postComments: state.postComments.concat(comment)
        }))
    }

    /**
     * Adjusts state to remove comment
     * @param comment
     */
    removeComment = (comment) => {
        this.setState( (state) => ({
            postComments: state.postComments.filter((oComment) => oComment.id !== comment.id)
        }))
    }

    /**
     * Adjusts state to edit comment
     * @param commentId
     * @param commentText
     */
    editComment = (commentId, commentText) => {
        this.setState( (state) => ({
            postComments: state.postComments.map((oComment) => {
                if(oComment.id === commentId) {
                    oComment.body = commentText;
                }
                return oComment;
            })
        }))
    }

    render() {
        const {post, postComments} = this.state;
        let postCommentDisplay = postComments === null ? '':
            postComments.map((comment) => (
                <Comment
                    comment={comment}
                    key={comment.id}
                    onRemoveComment={this.removeComment}
                    onEditComment={this.editComment}
                    post={post}
                />
            ));
        return (
            <div className={"post-detail-container"}>
                <PostForm post={post} type={'edit'}/>
                {postCommentDisplay}
                <CommentForm
                    type={'add'}
                    post={post}
                    onAddComment={this.addComment}
                />
            </div>
        )
    }
}
function mapStateToProps({modal}) {
    return {
        modal: modal
    }
}

export default connect(
    mapStateToProps
)(PostDetail);