import React,{ useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardGroup , Alert } from 'react-bootstrap'
import { getUserStats } from '../../store/actions/userAction'



const UserStats = (props) => {
    
    const user = useSelector(state => state.userReducer )
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getUserStats(user.auth._id))
    }, [dispatch, user.auth._id])


    return(
        <>
            { user.stats ? 
            <div className="my-4">
            <h3>Your Stats</h3>
            <CardGroup>
                <Card border="primary">
                    <Card.Body>
                        <Card.Title> Categories created by you:</Card.Title>
                        { user.stats.categories.length === 0 ?
                            "Sorry you don't have categories"
                        :
                            user.stats.categories.map((item,idx)=>(
                                <Alert key={idx} variant="primary">
                                    {item.name}
                                </Alert>
                            ))
                        }
                    </Card.Body>
                </Card>
                <Card border="info">
                    <Card.Body>
                        <Card.Title>Last created posts:</Card.Title>
                        { user.stats.categories.length === 0 ?
                            "Sorry you don't have posts"
                        :
                            user.stats.posts.map((item,idx)=>(
                                <Alert key={idx} variant="info">
                                   - {item.title}
                                </Alert>
                            ))
                        }
                    </Card.Body>
                </Card>
            </CardGroup>
            </div>
            :null}
          
        </>
    )
}

export default UserStats