import * as api from '../api/postsApi'
import { GET_CATEGORIES, CREATE_POST } from '../constants/postsConstant'


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