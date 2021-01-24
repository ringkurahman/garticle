import * as api from '../api/userApi'
import { AUTH_USER, USER_LOGOUT, USER_STATS } from '../constants/userConstant'



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
