import { CREATE_POST, GET_CATEGORIES } from '../constants/postsConstant'



export default function (state = {}, action) {
    switch (action.type) {
        case GET_CATEGORIES:
        case CREATE_POST:
            return { ...state, ...action.payload }
        
        default:
            return state
    }
}