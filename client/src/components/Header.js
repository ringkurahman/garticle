//rsc
import React from 'react'
import { withRouter } from 'react-router'
import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../store/actions/userAction'


const Header = (props) => {

    const { history } = props
    const dispatch = useDispatch()
    const user = useSelector(state => state.userReducer)

    const handleLogout = () => {
        dispatch(logoutUser())
        history.push('/')
    }

    return (
        <>
            <Navbar className="bg-custom" variant="dark">
                <LinkContainer to="/">
                    <Navbar.Brand>GArticle</Navbar.Brand>
                </LinkContainer>
            </Navbar>
            <Navbar className="bg-custom-small" variant="dark">
                <Nav>
                    { user.auth ?
                        <> 
                            <Nav.Link
                               onClick={()=>handleLogout()} 
                            >
                                Logout
                            </Nav.Link>

                            <LinkContainer to="/user-area">
                                <Nav.Link> User </Nav.Link>
                            </LinkContainer>
                        </>
                        :
                        <LinkContainer to="/sign-in">
                            <Nav.Link> Sign in </Nav.Link>
                        </LinkContainer>
                    }
                </Nav>
            </Navbar>
        </>
    )
}

export default withRouter(Header)