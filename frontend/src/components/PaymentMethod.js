import React, { useState } from 'react'
import { Form,Col, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import CheckoutSteps from './CheckoutSteps';
import FormContainer from './FormContainer'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentMethod = ( { history } ) => {

    /* First fetch the shipping address, make sure it is entered 
        for this component to work */
    
    const { shippingAddress, cartItems } = useSelector( state => state.cart);

    if(!shippingAddress || Object.keys(shippingAddress).length === 0){
        // if undefined, null or an empty address object

        // if there is not a valid, or any address, force the user to enter one
        history.push('/shipping');
    }

    /* Fetch whether a user has been authenticated or not in order to show this component */
    const { userInfo } = useSelector( state => state.userLogin);
    
    if(!userInfo || cartItems.length === 0){
        /* if there is not an authenticated user, redirect to log in */
        /* or if there aren't any items in the shopping cart, redirect to log in */
        history.push("/login");
    }

    /* Also load if a payment method has been chosen previously */

    const cart = useSelector( state => state.cart );
    
    const [paymentMethod, setPaymentMethod] = useState(cart.paymentMethod);

    const dispatch = useDispatch();

    const handlePaymentMethod = (event) => {
        event.preventDefault();

        dispatch( savePaymentMethod(paymentMethod) );

        history.push("/placeorder");
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <h1 className="mt-3 mb-3">Payment Method</h1>
            <Form onSubmit={handlePaymentMethod}>
                <Form.Group>
                    <Form.Label
                        as='legend'
                        className="mt-1 mb-4"
                    >Select Payment Method</Form.Label>
                
                <Col>
                    <Form.Check
                        className="mt-2 mb-2"
                        type="radio"
                        label="PayPal or Credit Card"
                        id="PayPal"
                        name="paymentMethod"
                        value= "PayPal"
                        defaultChecked
                        onChange={(e) => (setPaymentMethod(e.target.value))}
                        checked={paymentMethod==="PayPal"}
                    />
                    <Form.Check
                        className="mt-2 mb-2"
                        type="radio"
                        label="Apple Pay"
                        id="ApplePay"
                        name="paymentMethod"
                        value="ApplePay"
                        onChange={(e) => (setPaymentMethod(e.target.value))}
                        checked={paymentMethod === "ApplePay"}
                    />
                    <Form.Check
                        className="mt-2 mb-2"
                        type="radio"
                        label="Google Pay"
                        id="GooglePay"
                        name="paymentMethod"
                        value="GooglePay"
                        onChange={(e) => (setPaymentMethod(e.target.value))}
                        checked={paymentMethod === "GooglePay"}
                    />
                    <Form.Check
                        className="mt-2 mb-2"
                        type="radio"
                        label="Debit Card"
                        id="debitCard"
                        name="paymentMethod"
                        value="debitCard"
                        onChange={ (e) => (setPaymentMethod(e.target.value))}
                        checked={paymentMethod === "debitCard"}
                    />
                    <Form.Check
                        className="mt-2 mb-2"
                        type="radio"
                        label="Stripe"
                        id="stripe"
                        name="paymentMethod"
                        value="Stripe"
                        onChange={ (e) => (setPaymentMethod(e.target.value))}
                        checked={paymentMethod === "Stripe"}
                    />
                </Col>
                </Form.Group>
                <Button
                    type="submit"
                    variant="primary"
                    className="mb-4 mt-4 p-2"
                >Continue</Button>
                
            </Form>
        </FormContainer>
    )
}

export default PaymentMethod
