//rcc
import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import Header from './components/Header'
import Home from './views/Home'
import Login from './views/Login'


class Routes extends Component {

    render() {
        return (
            <BrowserRouter>
                <Header />
                <Container className='mt-4'>
                    <Switch>
                        <Route path='/sign-in' component={ Login } />
                        <Route path='/' component={ Home } />
                    </Switch>
                </Container>
            </BrowserRouter>
        )
    }
}


export default Routes






