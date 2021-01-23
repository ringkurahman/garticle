import React,{ useState, useEffect } from 'react'
import { useSelector } from 'react-redux'



export default function (ComposedComponent) {
    
    const AuthenticationCheck = (props) => {

        const [isAuth, setIsAuth] = useState(false)
        const user = useSelector( state => state.userReducer)


        useEffect(()=>{
            if(!user.auth){
                // user not auth
                props.history.push('/')
            } else {
                setIsAuth(true)
            }
        },[props, user])


        if(!isAuth){
            return(
                <div className="main_loader">
                    <div className="lds-heart">
                        <div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return(
                <ComposedComponent {...props}/>
            )
        }
    }
    return AuthenticationCheck
}