//rfc
import {
    AUTH_USER,
    USER_LOGOUT,
    USER_STATS,
    CREATE_POST,
    GET_CATEGORIES,
    USER_POSTS,
    UPDATE_POST
} from '../constants/userConstant'




export default function(state={}, action){
    switch(action.type){
        case AUTH_USER:
            return {...state, ...action.payload }
        case USER_STATS:
            return {...state, ...action.payload }
        case USER_LOGOUT:
            return { auth: action.payload }
        case GET_CATEGORIES:
            return { auth: action.payload }
        case CREATE_POST:
            return { ...state, ...action.payload }
        case USER_POSTS:
            return { ...state, ...action.payload }
        case UPDATE_POST:
            return { ...state, ...action.payload }
        default:
            return state
    }
}