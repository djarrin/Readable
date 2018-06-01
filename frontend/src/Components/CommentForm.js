import React, { Component } from 'react';
import * as ReadableAPI from '../Utils/ReadableAPI';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import { Button, Alert, Input } from 'reactstrap';
import {addComment} from "../Actions/Comments";


class CommentForm extends Component {
    static propTypes = {
        post: PropTypes.object,
        type: PropTypes.string.isRequired,
        onAddComment: PropTypes.func,
        onEditComment: PropTypes.func,
        comment: PropTypes.object,
        authorDisable: PropTypes.bool
    }

    state = {
        textValue: '',
        authorValue: '',
        invalidInput: false
    }

    componentWillReceiveProps(nextProps) {
        //if editing a post will set state to the corresponding states
        const {comment} = this.props;
        if((typeof nextProps.comment !== 'undefined' && nextProps.comment !== null) && nextProps.comment !== comment) {
            this.setState({
                textValue: comment.body,
                authorValue: comment.author
            })
        }
    }
    componentWillMount = () => {
        //if editing a post will set state to the corresponding states
        const {comment, type} = this.props;
        if(typeof comment !== 'undefined' && comment !== null) {
            this.setState({
                textValue: comment.body,
                authorValue: comment.author
            })
        }
        if(type === 'edit') {
            this.setState({
                authorDisable: true
            })
        }
    }

    /**
     * method to update component text state
     * @param event
     */
    textEnter = (event) => {
        this.setState({textValue: event.target.value})
    }

    /**
     * method to update component author state
     * @param event
     */
    authorEnter = (event) => {
        this.setState({authorValue: event.target.value})
    }

    /**
     * Handles comment submit, sends request then updates the comment
     * count through dispatch and sends new state up the component tree
     */
    commentSubmit = () => {
        const {textValue, authorValue} = this.state;
        if(this.validate()) {
            ReadableAPI.addComment(textValue, authorValue, this.props.post.id).then((res) => {
                let commentObject = {
                    timestamp: res.timestamp,
                    body: res.body,
                    author: res.author,
                    parentId: res.parentId
                };
                this.props.dispatch(addComment(commentObject));
                this.props.onAddComment(res);
                this.clearValues()
            });
        }
    }

    /**
     * Clears the form values
     */
    clearValues = () => {
        this.setState({
            textValue: '',
            authorValue: ''
        })
    }

    /**
     * Validates the form and adjusts state
     * to show warning message if necessary
     * @returns {boolean}
     */
    validate = () => {
        if(this.state.authorValue !== '' && this.state.textValue !== '') {
            this.setState({invalidInput: false});
            return true;
        }
        this.setState({invalidInput: true});
        return false;
    }

    /**
     * sends new comment state up the component tree
     */
    commentEdit = () => {
        const {textValue} = this.state;
        if(this.validate()) {
            this.props.onEditComment(this.props.comment.id, textValue)
        }
    }

    render() {
        const {type} = this.props;
        let SubmitButton = type === 'add' ? (<Button onClick={this.commentSubmit}>Post</Button>) : (<Button onClick={this.commentEdit}>Edit</Button>);
        return(
            <div className={'comment-form-container'}>
                <Input
                    type="textarea"
                    name="text"
                    id="commentInput"
                    placeholder={'Comment Content...'}
                    onChange={this.textEnter}
                    value={this.state.textValue}
                />
                <Input
                    type={"text"}
                    className={"commentAuthor"}
                    placeholder={'Comment Author...'}
                    onChange={this.authorEnter}
                    value={this.state.authorValue}
                    disabled={this.state.authorDisable}
                />
                {SubmitButton}
                <Alert color="danger" className={"validator " + this.state.invalidInput}>
                    Both author and comment section must be filled in
                </Alert>
            </div>
        )
    }

}


function mapDispatchToProps (dispatch) {
    return {
        addComment: (data) => dispatch(addComment(data))
    }
}

export default connect(
    mapDispatchToProps
)(CommentForm);