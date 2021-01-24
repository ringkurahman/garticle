import * as api from '../api/userApi'
import {
    AUTH_USER,
    USER_LOGOUT,
    USER_STATS,
    CREATE_POST,
    GET_CATEGORIES,
    USER_POSTS,
    UPDATE_POST,
    GET_POSTS,
    GET_POST
} from '../constants/userConstant'



export const signupUser = (userData) => ({
    type: AUTH_USER,
    payload: api.signupUser(userData)
})


export const loginUser = (userData) => ({
    type: AUTH_USER,
    payload: api.loginUser(userData)
})


export const autoSign = () => ({
    type: AUTH_USER,
    payload: api.autoSign()
})


export const logoutUser = () => {

    localStorage.removeItem('X-AUTH')
    
    return {
        type: USER_LOGOUT,
        payload: null
    }
}


export const updateUserEmailPass = (email, password, _id) => ({
        type: AUTH_USER,
        payload: api.updateUserEmailPass(email, password, _id)
})


export const getUserStats = (_id) => ({
    type: USER_STATS,
    payload: api.getUserStats(_id)
})




export const getCategories = () => ({
    type: GET_CATEGORIES,
    payload: api.getCategories()
})


export const createPost = (formData) => ({
    type: CREATE_POST,
    payload: api.createPost(formData)
})


export const clearCreatedPost = () => ({
    type: CREATE_POST,
    payload: { createPost: null }
})


export const getUserPosts = (sort, prevState, _id) => ({
    type: USER_POSTS,
    payload: api.getUserPosts(sort, prevState, _id)
})


export const updatePostStatus = (status, _id, state) => ({
    type: UPDATE_POST,
    payload: api.updatePostStatus(status, _id, state)
})


export const removePost = (_id, state) => ({
    type: USER_POSTS,
    payload: api.removePost(_id, state)
})


export const getPosts = (sort, state) => ({
    type: GET_POSTS,
    payload: api.getPosts(sort, state)
})


export const getPost = (_id) => ({
    type: GET_POST,
    payload: api.getPost(_id)
})
