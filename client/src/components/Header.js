//rsc
import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


const Header = () => {
    return (
        <>
            <Navbar className="bg-custom" variant="dark">
                <LinkContainer to="/">
                    <Navbar.Brand>GArticle</Navbar.Brand>
                </LinkContainer>
            </Navbar>
            <Navbar className="bg-custom-small" variant="dark">
                <Nav>
                    <LinkContainer to="/sign-in">
                        <Nav.Link> Sign in </Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar>
        </>
    )
}

export default Header