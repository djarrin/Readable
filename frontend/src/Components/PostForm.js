import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as ReadableAPI from '../Utils/ReadableAPI';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Alert, Input } from 'reactstrap';
import {addPost, editPost} from "../Actions/Posts";
import {changeModalState} from "../Actions/Modal";

class PostForm extends Component {
    static propTypes = {
        defaultCat: PropTypes.string,
        dispatch: PropTypes.func.isRequired,
        post: PropTypes.object,
        type: PropTypes.string.isRequired
    }

    state = {
        textValue: '',
        category: '',
        titleValue: '',
        authorValue: '',
        selectDisable: false,
        textEmpty: false,
        categoryEmpty: false,
        authorInputDisabled: false
    }

    componentWillMount = () => {

        /**
         * just determines what category the post that
         * is being edited is in order to pre-fill the
         * value and disable
         */
        switch (this.props.defaultCat) {
            case '':
                this.setState({selectDisable: false})
                break;
            case 'redux':
                this.setState({
                    selectDisable: true,
                    category: 'redux'
                })
                break;
            case 'react':
                this.setState({
                    selectDisable: true,
                    category: 'react'
                })
                break;
            case 'udacity':
                this.setState({
                    selectDisable: true,
                    category: 'udacity'
                })
                break;
            default:
                this.setState({selectDisable: false})
        }

    }

        componentWillReceiveProps(nextProps) {
        //if the post prop comes though adjust states to reflect this
        if(typeof nextProps.post !== 'undefined' && nextProps.post !== null) {
            this.setState({
                textValue: nextProps.post.body,
                category: nextProps.post.category,
                titleValue: nextProps.post.title,
                authorValue: nextProps.post.author,
                selectDisable: true,
                authorInputDisabled: true
            })
        }

    }

    /**
     * Will submit a post if the valid fields have been filled
     * @param event
     */
    postSubmit = (event) => {
        event.preventDefault();

        let validated = this.validateValues();

        if(validated) {
            ReadableAPI.addPost(this.state.titleValue, this.state.textValue, this.state.authorValue, this.state.category).then((res) => {
                let data = {
                    id: res.id,
                    timestamp: res.timestamp,
                    body: res.body,
                    author: res.author,
                    category: res.category,
                    title: res.title
                }
                this.props.dispatch(addPost(data));
                this.clearValues();
            });
        }
    }

    /**
     * Will submit a post edit if the valid fields have been filled
     * @param event
     */
    postEdit = (event) => {
        event.preventDefault();

        let validated = this.validateValues();

        if(validated) {
            ReadableAPI.editPost(this.props.post.id, this.state.titleValue, this.state.textValue).then((res) => {
                let data = {
                    id: res.id,
                    newTitle: res.title,
                    newBody: res.body
                }
                this.props.dispatch(editPost(data));
                let modalData = {
                    openState: false
                }
                this.props.dispatch(changeModalState(modalData))
            })
        }
    }

    /**
     * Adjusts post form state on user action
     * @param e
     */
    catSelect = (e) => {
        this.setState({category: e.target.value})
    }

    /**
     * Adjusts the form state on user action
     * @param e
     */
    textEnter = (e) => {
        this.setState({textValue: e.target.value})
    }

    /**
     * Clears all form values on submit
     */
    clearValues = () => {
        if(this.props.defaultCat !== '') {
            this.setState({
                textValue: '',
                authorValue: '',
                titleValue: ''
            })
        } else {
            this.setState({
                textValue: '',
                category: '',
                authorValue: '',
                titleValue: ''
            })
        }
    }

    /**
     * Validates the form and adjusts states to show warning messages
     * if the proper fields are not filled in
     * @returns {boolean}
     */
    validateValues = () => {
        let textValid = true;
        let catValid = true;
        let authorValid = true;
        let titleValid = true;

        if(this.state.category === '') {
            this.setState({categoryEmpty: true});
            catValid = false;
        } else {
            this.setState({categoryEmpty: false});
            catValid = true;
        }

        if(this.state.textValue === '') {
            this.setState({textEmpty: true});
            textValid = false;
        } else {
            this.setState({textEmpty: false});
            textValid = true;
        }

        if(this.state.authorValue === '') {
            this.setState({authorEmpty: true});
            authorValid = false;
        } else {
            this.setState({authorEmpty: false});
            authorValid = true;
        }

        if(this.state.titleValue === '') {
            this.setState({titleEmpty: true});
            titleValid = false;
        } else {
            this.setState({titleEmpty: false});
            titleValid = true;
        }

        if(textValid && catValid && authorValid && titleValid) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Adjusts the form state on user action
     */
    titleEnter = (e) => {
        this.setState({titleValue: e.target.value})
    }

    /**
     * Adjusts the form state on user action
     */
    authorEnter = (e) => {
        this.setState({authorValue: e.target.value})
    }

    render() {
        const {type} = this.props;
        let SubmitButton = type === 'add' ? (<Button onClick={this.postSubmit}>Post</Button>) : (<Button onClick={this.postEdit}>Edit</Button>);
        return (
            <Form>
                <FormGroup className={"post-submit"}>
                    <Input type={"text"} className={"postTitle"} placeholder={'Post Title....'} onChange={this.titleEnter} value={this.state.titleValue}/>
                    <Input type="textarea" name="text" id="postInput" placeholder={'Post Content...'} onChange={this.textEnter} value={this.state.textValue}/>
                    <div className={"input-controls"}>
                        <Input
                            type="select"
                            name="select"
                            id="catSelect"
                            onChange={this.catSelect}
                            value={this.state.category}
                            disabled={this.state.selectDisable}
                        >
                            <option value={''}>Category</option>
                            <option value={'react'}>React</option>
                            <option value={'udacity'}>Udacity</option>
                            <option value={'redux'}>Redux</option>
                        </Input>
                        <Input
                            type={"text"}
                            className={"postAuthor"}
                            placeholder={'Post Author...'}
                            onChange={this.authorEnter}
                            value={this.state.authorValue}
                            disabled={this.state.authorInputDisabled}
                        />
                    </div>
                    {SubmitButton}
                    <Alert color="danger" className={"validator " + this.state.categoryEmpty}>
                        You must select a category.
                    </Alert>
                    <Alert color="danger" className={"validator " + this.state.textEmpty}>
                        You must type in a message to submit a post.
                    </Alert>
                    <Alert color="danger" className={"validator " + this.state.authorEmpty}>
                        You must insert an author.
                    </Alert>
                    <Alert color="danger" className={"validator " + this.state.titleEmpty}>
                        You must insert a title.
                    </Alert>
                </FormGroup>
            </Form>
        )
    }
}

function mapDispatchToProps (dispatch) {
    return {
        addPost: (data) => dispatch(addPost(data)),
        editPost: (data) => dispatch(editPost(data)),
        closeModal: (data) => dispatch(changeModalState(data))
    }
}
export default connect(
    mapDispatchToProps
)(PostForm);