import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'



export default function () {
    
    const AuthenticationCheck = () => {

        const user = useSelector(state => state.userReducer)
        
        return (
            <div>
                {
                    user.auth && < Redirect to='/' />
                }
            </div>
            )
    }
    return AuthenticationCheck
}




