//rcc
import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'

import AutoSignIn from './components/AutoSignIn'
import Protect from './components/ProtectHOC'
import CheckLogin from './components/LoginHOC'

import Header from './components/Header'
import Home from './views/Home'
import Login from './views/Login'
import UserArea from './views/User'
import Profile from './views/Profile'
import Articles from './views/Articles'
import CreateArticle from './views/CreateArticle'


class Routes extends Component {

    render() {
        return (
            <BrowserRouter>
                <AutoSignIn>
                <ToastContainer />
                <Header />
                <Container className='mt-4'>
                    <Switch>
                        <Route path='/user-area/create-article' component={ Protect(CreateArticle) } />
                        <Route path='/user-area/articles' component={ Protect(Articles) } />
                        <Route path='/user-area/profile' component={ Protect(Profile) } />
                        <Route path='/user-area' component={ Protect(UserArea) } />
                        <Route path='/sign-in' component={ CheckLogin(Login) } />
                        <Route path='/' component={ Home } />
                    </Switch>
                </Container>
                </AutoSignIn>
            </BrowserRouter>
        )
    }
}


export default Routes






