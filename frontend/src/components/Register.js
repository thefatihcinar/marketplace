import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from './Message'
import Loader from './Loader'
import FormContainer from './FormContainer'
import { Link } from 'react-router-dom'
import { register } from '../actions/userActions'

const Register = ( { location, history } ) => {

    const dispatch = useDispatch();

    let redirect = location.search ? 
                   location.search.split("=")[1]
                   : "/";
    
    /* go get learn whether there is an authenticated user or not */
    let userLogin = useSelector( state => state.userLogin );
    let { userInfo: loggedInUser} = userLogin;
    

    /* also fetch the user register global state */
    let { loading, userInfo , error } = useSelector(state => state.userRegister);

    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");
    let [message, setMessage] = useState(null);
    
    useEffect( () => {
        /* if there is an authenticated user, 
           redirect him to the where he wants to go */
        if(userInfo)
            history.push(redirect);
        if(loggedInUser)
            history.push("/");

    }, [userInfo, redirect, history, loggedInUser]);

    const submitHandler = (event) => {

        event.preventDefault();

        /* check whether the passwords match */
        if ( password !== confirmPassword){
            setMessage("passwords do not match");
        }
        else dispatch( register(name, email, password) )
        
    }


    return (
        <FormContainer>
            <h1 className="mt-3 mb-3 p-1">Sign Up</h1>
            
            {loading && <Loader/>}
            {error && <Message variant="danger">{error}</Message>}
            {message && <Message variant="danger">{message}</Message>}

            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                            type="text"
                            placeholder="Your"
                            value={name}
                            onChange = { (e) => (setName(e.target.value))}
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                            type="email"
                            placeholder="steve_wozniak@apple.com"
                            value={email}
                            onChange = { (e) => (setEmail(e.target.value))}
                    />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                            type="password"
                            value={password}
                            placeholder="your password"
                            onChange={(e) => (setPassword(e.target.value))}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                            type="password"
                            value={confirmPassword}
                            placeholder="confirm password"
                            onChange={(e) => (setConfirmPassword(e.target.value))}
                    />
                </Form.Group>
                
                <Button type="submit" className="p-2 mt-3 mb-4">
                    Register
                </Button>
            </Form>

            <Row className="py-3">
                <Col>
                    Already have account? <Link 
                            to={redirect ? `/login?redirect=${redirect}` : '/login'}>Click here to log in.</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default Register
