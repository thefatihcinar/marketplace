import React, { useState } from 'react'
import FormContainer from './FormContainer'
import { Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from './CheckoutSteps'

const Shipping = ( { history } ) => {

    /* Fetch whether a user has been authenticated or not in order to show this component */
    const { userInfo } = useSelector( state => state.userLogin);

    /* Fetch cart items in order to check */
    const { cartItems } = useSelector( state => state.cart);
    
    if(!userInfo || cartItems.length === 0){
        /* if there is not an authenticated user, redirect to log in */
        /* or if there aren't any items in the shopping cart */
        history.push("/login");
    }

    const dispatch = useDispatch();

    const cart = useSelector( state => state.cart );
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const continueHandler = (event) => {
        event.preventDefault();

        dispatch( saveShippingAddress( {
            address: address,
            city: city,
            postalCode: postalCode,
            country: country
        }) );

        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            
            <h1 className="mt-3 mb-1">Shipping</h1>
            <Form onSubmit={continueHandler}>
                <Form.Group controlId="address" className="mt-4 mb-2">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        required
                        placeholder="your address"
                        value={address}
                        onChange={(e) => (setAddress(e.target.value))}
                    />
                </Form.Group>
                <Form.Group controlId="city" className="mt-2 mb-2">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        required
                        placeholder="city"
                        value={city}
                        onChange={(e) => (setCity(e.target.value))}
                    />
                </Form.Group>
                <Form.Group controlId="postalCode" className="mt-2 mb-2">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="postal code"
                        value={postalCode}
                        onChange={(e) => (setPostalCode(e.target.value))}
                    />
                </Form.Group>
                <Form.Group controlId="country" className="mt-2 mb-2">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="country"
                        value={country}
                        onChange={(e) => (setCountry(e.target.value))}
                    />
                </Form.Group>
                <Button type="submit" variant="primary" className="mt-2 mb-2 p-2">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default Shipping
