import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import FontAwsome from 'react-fontawesome';
import * as ReadableAPI from '../Utils/ReadableAPI';
import {deleteComment} from '../Actions/Comments'
import {connect} from "react-redux";
import CommentForm from './CommentForm';

class Comment extends Component {
    static propTypes = {
        comment: PropTypes.object.isRequired,
        onRemoveComment: PropTypes.func.isRequired,
        onEditComment: PropTypes.func.isRequired,
        post: PropTypes.object.isRequired
    }

    state = {
        voteScore: 0,
        editState: false
    }

    componentWillMount = () => {
        //sets comment vote score by props that are passed
        this.setState({
            voteScore: this.props.comment.voteScore
        })
    }

    /**
     * up votes a comment by sending a request and updates comment state
     */
    upVote = () => {
        ReadableAPI.upVoteComment(this.props.comment.id).then((res) => {
            let voteScore = res.voteScore;
            this.setState({
                voteScore: voteScore
            })
        })
    }

    /**
     * down votes a comment by sending a request and updates comment state
     */
    downVote = () => {
        ReadableAPI.downVoteComment(this.props.comment.id).then((res) => {
            let voteScore = res.voteScore;
            this.setState({
                voteScore: voteScore
            })
        })
    }

    /**
     * deletes a comment by sending a request dispatching the comment count
     * and sending new state up the component tree
     */
    deleteComment = () => {
        ReadableAPI.deleteComment(this.props.comment.id).then((res) => {
            this.props.dispatch(deleteComment({parentId: res.parentId}));
            this.props.onRemoveComment(res)
        })
    }

    /**
     * edits a comment by sending a request sending
     * new state up the component tree
     */
    editComment = (commentId, commentText) => {
       ReadableAPI.editComment(commentId, commentText).then((res) => {
           this.props.onEditComment(commentId, commentText);
           this.toggleEdit();
       })
    }

    /**
     * will edit the edit state
     */
    toggleEdit = () => {
        this.setState({
            editState: !this.state.editState
        })
    }

    render() {
        const {comment, post} = this.props;
        const {voteScore, editState} = this.state;
        return (
            <div className={"comment-container"}>
                <div className={"comment-display " + editState}>
                    <div className={"comment-edit-button"} onClick={this.toggleEdit}>Edit Comment</div>
                    <FontAwsome name={"times-circle"} className={"deleteButton"} size={"2x"} onClick={this.deleteComment}/>
                    <div className={"comment-author"}>By {comment.author}</div>
                    <div className={"comment-body"}>{comment.body}</div>
                    <div className={"comment-time"}>{dateFormat(comment.timestamp, 'mmmm d, yyyy')}</div>
                    <div className={"comment-vote-score"}>
                        {voteScore}
                        <FontAwsome name="thumbs-up" className={"thumbs-up-icon"} onClick={this.upVote}/>
                        <FontAwsome name="thumbs-down" className={"thumbs-down-icon"} onClick={this.downVote}/>
                    </div>
                </div>
                <div className={"comment-edit-form " + editState}>
                    <div className={"comment-edit-button"} onClick={this.toggleEdit}>Keep Comment</div>
                    <CommentForm
                        type={'edit'}
                        post={post}
                        onEditComment={this.editComment}
                        comment={comment}
                    />
                </div>
            </div>
        )
    }
}

function mapDispatchToProps (dispatch) {
    return {
        deleteComment: (data) => dispatch(deleteComment(data))
    }
}


export default connect(
    mapDispatchToProps
)(Comment);