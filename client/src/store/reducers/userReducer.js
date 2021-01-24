//rfc
import { AUTH_USER, USER_LOGOUT, USER_STATS } from '../constants/userConstant'



export default function (state = {}, action) {
    switch (action.type) {
        case AUTH_USER:
        case USER_STATS:
            return { ...state, ...action.payload }
        
        case USER_LOGOUT:
            return { auth: action.payload }
        
        default:
            return state
    }
}
