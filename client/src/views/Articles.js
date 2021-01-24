//rsc
import React, { useReducer, useEffect } from 'react'
import UserAreaHOC from '../components/UserAreaHOC'
import { Table, Button } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { getUserPosts, updatePostStatus, removePost } from '../store/actions/userAction'



const Articles = (props) => {

    const [ sort, setSort] = useReducer(
      (state, newState) => ({...state, ...newState}),
      {limit:3,order:"desc",sortBy:"_id",skip:0}
    )

    const user = useSelector(state => state.userReducer)
    const dispatch = useDispatch()

    const updateStatusHandler = (item) =>{
      const status = item.status === 'DRAFT' ? 'PUBLIC':'DRAFT'
      dispatch(updatePostStatus(status,item._id,user.posts))
     }

    useEffect(()=>{
      dispatch(getUserPosts(sort, [], user.auth._id))
    }, [dispatch, sort, user.auth._id])
    
    return (
        <UserAreaHOC>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {
                    user.posts ?
                    user.posts.map((item, i)=>(
                        <tr key={i}>
                        <td>{i+1}</td>
                        <td>{item.title}</td>
                        <td>{item.category.name}</td>
                        <td
                            onClick={ ()=> updateStatusHandler(item)}
                            className={
                            item.status === 'DRAFT'? 'yell':'green'
                            }
                        >{item.status}</td>
                        <td
                            onClick={()=>{
                            dispatch(removePost(item._id, user.posts))
                            }}
                            className="remove_btn"
                        >
                            Remove
                        </td>
                        </tr>
                    ))
                    :null
                }
                </tbody>
            </Table>
            <Button
                onClick={()=>{
                let skip = sort.skip + sort.limit
                    dispatch(getUserPosts({ ...sort, skip:skip }, user.posts, user.auth._id))
                        .then(() => {
                            setSort({ skip: skip })
                        })
                }}
            >
                Load more
          </Button>
          <Button
            className="ml-2"
            variant="outline-info"
            onClick={()=>{
              props.history.push('/user-area/create-article')
            }}
          >
           Create new article
          </Button>

        </UserAreaHOC>
    )
}

export default Articles