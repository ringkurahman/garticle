import { GET_POST, GET_POSTS } from '../constants/userConstant'



export default function (state = {}, action) {
    switch (action.type) {
        case GET_POSTS:
            return { ...state, ...action.payload }
        
        case GET_POST:
            return { ...state, ...action.payload }
        
        default:
            return state
    }
}