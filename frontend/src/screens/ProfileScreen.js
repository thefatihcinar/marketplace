import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button, Container } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getUserDetails } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProfileScreen = ( { history } ) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    /* Load the userDetails information to the application */
    const userDetails = useSelector( state => state.userDetails );
    const { loading, error, user } = userDetails;

    /* Also load the userLogin state as well
       because if the user is not logged in, do not display this page */
    const userLogin = useSelector ( state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect( () => {
        if(!userInfo){
            // if the user is not logged in, redirect to /login
            history.push("/login");
        }
        else {
            // user might not be loaded, check it 
            if(!user){
                console.log("Profile data is fetched!");
                dispatch( getUserDetails('profile') )
            }
            else{
                // If we have the user, FILL THE FORM!
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, history, user, userInfo]);

    const submitHandler = (event) => {
        /* when clicked, it updates the user profile */

        event.preventDefault();

        setMessage("")

        // DISPATCH: UPDATE USER PROFILE
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                {/* Update User Profile*/}
                <Col sm={12} md={3}>
                    <h2 className="mt-4 mb-4">User Profile</h2>
                    {loading && <Loader/>}
                    {error && <Message variant="danger">{error}</Message>}
                    {message && <Message variant="danger">{message}</Message>}
                    {!loading
                     ?
                     <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name" className="mb-2">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                placeholder="enter new name"
                                onChange={(e) => (setName(e.target.value))}
                            />
                        </Form.Group>
                        <Form.Group controlId="email" className="mb-2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                placeholder="enter new email"
                                onChange={(e) => (setEmail(e.target.value))}
                            />
                        </Form.Group>
                        <Form.Group controlId="password" className="mb-2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="enter new password"
                                value={password}
                                onChange={(e) => (setPassword(e.target.value))}
                            />
                        </Form.Group>
                        <Form.Group controlId="confirmPassword" className="mb-2">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="confirm your new password"
                                value={confirmPassword}
                                onChange={(e) => (setConfirmPassword(e.target.value))}
                            />
                        </Form.Group>
                        <Button type="submit" 
                                variant="dark" 
                                className="mt-4 mb-4 p-2">
                                    Update
                        </Button>
                    </Form>
                    :<div></div>
                    }
                </Col>
                {/* Orders */}
                <Col sm={12} md={9}>

                </Col>
            </Row>
        </Container>
    )
}

export default ProfileScreen
