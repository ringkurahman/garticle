//rsc
import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Alert, Toast } from 'react-bootstrap'
import axios from 'axios'
import ToastHandler from '../components/utils/toasts'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useDispatch } from 'react-redux'
import { signupUser } from '../store/actions/userAction'


const Login = (props) => {

    const dispatch = useDispatch()
    const [type, setType] = useState(true)
    
    const formik = useFormik({
        initialValues:{
            email:'',
            password:''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email')
                .required('Sorry the email is required'),
            
            password: Yup.string()
                .min(3, 'Must be more than 5 char')
                .required('Sorry the password is required')
        }),
        onSubmit: values => { 
           onSubmitHandler(values)
        }
    }) 

    const switchTypeHandler = () => {
        setType(!type)
    }

    const onSubmitHandler = (values) => {
        if(type){
            // sign in
        } else {
            // register
            dispatch(signupUser(values))
                .then(({ payload }) => {
                    successHandler(payload)
                })
        }
    }

    const successHandler = (payload) => {
        const errors = payload.errors
        const auth = payload.auth

        if (errors) { ToastHandler(errors, 'ERROR') }

        if (auth) {
            localStorage.setItem('X-AUTH', auth.token)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth.token
            ToastHandler('Welcome', 'SUCCESS')
            props.history.push('/user-area')
        }
    }

    return (
        <>
            <Form onSubmit={formik.handleSubmit}>
                <Row className="mb-4">
                    <Col>
                        <h1>Sign in / Register</h1>
                    </Col>
                </Row>
                <Form.Group>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your email"
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    { formik.touched.email && formik.errors.email ? (
                        <Alert variant="danger">
                            {formik.errors.email}
                        </Alert>
                    ) :null}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    { formik.touched.password && formik.errors.password ? (
                        <Alert variant="danger">
                            {formik.errors.password}
                        </Alert>
                    ) :null}
                </Form.Group>

                { type ?
                    <Button variant="primary" type="submit">Sign in</Button>
                    :
                    <Button variant="primary" type="submit">Register</Button>
                }
                <Button
                    variant="secondary"
                    className="ml-2"
                    onClick={switchTypeHandler}
                >
                    Already { type ? 'Signed in': 'Registered'} ? click here
                </Button>
            </Form>
        </>
    )
}

export default Login