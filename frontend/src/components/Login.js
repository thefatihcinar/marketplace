import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FormContainer from './FormContainer'
import Message from './Message'
import Loader from './Loader'
import { login } from '../actions/userActions'


const LogIn = ( { history, location }) => {

    const dispatch = useDispatch();

    /* Fetch whether the user has logged in or not from redux */
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo, loading, error } = userLogin;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    /* in single-page applications, form values are stored as component level states */

    const redirect = location.search ? 
                     location.search.split("=")[1]
                     :'/';

    useEffect(() => {
        // When the compoent laods, 
        // first check whether the user has already signed in or not
        if(userInfo){
            history.push(redirect);
        }
    }, [userInfo, history, redirect]);

    const submitHandler = (event) => {
        // Do not refresh the page
        event.preventDefault();
        
        dispatch( login(email, password) )
    };

    

    return (
        <FormContainer>
            <h1 className="mt-3 mb-3">Sign In</h1>

            {loading && <Loader/>}
            {error && <Message variant="danger">{error}</Message>}

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

                <Button type='submit' variant='primary' className="mt-3">
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
