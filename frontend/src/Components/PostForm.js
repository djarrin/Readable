import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as ReadableAPI from '../Utils/ReadableAPI';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Alert, Input, FormText } from 'reactstrap';
import {addPost} from "../Actions/Posts";

class PostForm extends Component {
    static propTypes = {
        defaultCat: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    state = {
        textValue: '',
        category: '',
        titleValue: '',
        authorValue: '',
        selectDisable: false,
        textEmpty: false,
        categoryEmpty: false
    }

    componentWillMount = () => {
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

    postSubmit = (event) => {
        event.preventDefault();

        let validated = this.validateValues();

        if(validated) {
            ReadableAPI.addPost(this.state.titleValue, this.state.textValue, this.state.authorValue, this.state.category).then((res) => {
                console.log(res);
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

    catSelect = (e) => {
        this.setState({category: e.target.value})
    }

    textEnter = (e) => {
        this.setState({textValue: e.target.value})
    }

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

    titleEnter = (e) => {
        this.setState({titleValue: e.target.value})
    }

    authorEnter = (e) => {
        this.setState({authorValue: e.target.value})
    }

    render() {
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
                        <Input type={"text"} className={"postAuthor"} placeholder={'Post Author...'} onChange={this.authorEnter} value={this.state.authorValue}/>
                    </div>
                    <Button onClick={this.postSubmit}>Post</Button>
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
        addPost: (data) => dispatch(addPost(data))
    }
}
export default connect(
    mapDispatchToProps
)(PostForm);