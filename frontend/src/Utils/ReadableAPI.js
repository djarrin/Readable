import axios from 'axios';
import uuidv1 from 'uuid';

const api = "http://localhost:3001";

const config = {
    headers: { 'Authorization': 'NNzSfSSzqsCfFQrwdQB76SridPp9cozy' }
}

export const getCategories = () =>
    axios.get(`${api}/categories`, config)
        .then((response) => response)
        .then(data => data.data.categories);

export const getCategoriesPost = (categorie) =>
    axios.get(`${api}/${categorie}/posts`, config)
        .then((res) => res.data);

export const getAllPosts = () =>
    axios.get(`${api}/posts`, config)
        .then((res) => res.data);

export const addPost = (title, body, author, category) =>
    axios.post(`${api}/posts`,
        {
            id: uuidv1(),
            timestamp: Date.now(),
            title: title,
            body: body,
            author: author,
            category: category
        }, config)
        .then((res) => res.data);

export const getSinglePost = (id) =>
    axios.get(`${api}/posts/${id}`, config)
        .then((res) => res.data);

export const upVotePost = (id) =>
    axios.post(`${api}/posts/${id}`, {option: 'upVote'}, config)
        .then((res) => res.data);

export const downVotePost = (id) =>
    axios.post(`${api}/posts/${id}`, {option: 'downVote'}, config)
        .then((res) => res.data);

export const editPost = (id, newTitle, newBody) =>
    axios.put(`${api}/posts/${id}`, {title: newTitle, body: newBody}, config)
        .then((res) => res.data);

export const deletePost = (id) =>
    axios.delete(`${api}/posts/${id}`, config)
        .then((res) => res.data);

export const getPostComments = (id) =>
    axios.get(`${api}/posts/${id}/comments`, config)
        .then((res) => res.data);

export const addComment = (body, author, parentID) =>
    axios.post(`${api}/comments`,
        {
            id: uuidv1(),
            timestamp: Date.now(),
            body: body,
            author: author,
            parentId: parentID
        }, config)
        .then((res) => res.data);

export const getComment = (id) =>
    axios.get(`${api}/comments/${id}`, config)
        .then((res) => res.data);

export const upVoteComment = (id) =>
    axios.post(`${api}/comments/${id}`, {option: 'upVote'}, config)
        .then((res) => res.data);

export const downVoteComment = (id) =>
    axios.post(`${api}/comments/${id}`, {option: 'downVote'}, config)
        .then((res) => res.data);

export const editComment = (id, body) =>
    axios.put(`${api}/comments/${id}`, {timestamp: Date.now(), body: body}, config)
        .then((res) => res.data);

export const deleteComment = (id) =>
    axios.delete(`${api}/comments/${id}`, config)
        .then((res) => res.data);