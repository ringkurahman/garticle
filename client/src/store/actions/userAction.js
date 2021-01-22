import * as api from '../api/userApi'
import { AUTH_USER } from '../constants/userConstant'



export const signupUser = (userData) => ({
    type: AUTH_USER,
    payload: api.signupUser(userData)
})