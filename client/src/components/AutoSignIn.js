import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { autoSign } from '../store/actions/userAction'


const AutoSignIn = (props) => {

    const [ loading, setLoading ] = useState(true)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(autoSign())
            .then(() => {
            setLoading(false)
        })
    },[dispatch])


    if(loading){
        return(
            <div className="main_loader">
                <div className="lds-heart">
                    <div>
                    </div>
                </div>
            </div>
        )
    } else{
        return(
            <>
                {props.children}
            </>
        )
    }
}

export default AutoSignIn