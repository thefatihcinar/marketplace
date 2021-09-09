import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FormContainer from './FormContainer'
import Message from './Message'
import Loader from './Loader'
import { login } from '../actions/userActions'


const LogIn = ( { history, location }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    /* in single-page applications, form values are stored as component level states */

    const redirect = location.search ? 
                     location.search.split("=")[1]
                     :'/';

    const submitHandler = () => {};

    

    return (
        <FormContainer>
            <h1 className="mt-2 mb-2">Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>E-Mail Address</Form.Label>
                    <Form.Control type="email"
                                  placeholder="steve_wozniak@apple.com"
                                  value={email}
                                  onChange={(e) => (setEmail(e.target.value))}
                                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password'
                                  placeholder = "password"
                                  value={password}
                                  onChange={(e) => (setPassword(e.target.value))}>

                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className="mt-2">
                    Sign In
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    New Customer?   <Link to={`/register?redirect=${redirect}`}>Register Here</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LogIn
