import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Row, Col, Button, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from './Message'
import Loader from './Loader'
import CheckoutSteps from './CheckoutSteps'
import './PlaceOrder.css'
/* Actions */
import { createOrder } from '../actions/orderActions'

const PlaceOrder = ( { history } ) => {

    const dispatch = useDispatch();

    const cart = useSelector( state => state.cart );
    const { userInfo } = useSelector( state => state.userLogin);
    const { paymentMethod } = cart;
    const { shippingAddress } = cart;

    /* Now call the global order state to track new order */

    const orderCreate = useSelector( state => state.orderCreate);
    const { order, success, error, loading } = orderCreate;


    /* If the shipping address is missing,
        or not a valid payment method is not found,
        or there is an authenticated user,
        or there is not any items in the shopping cart
        return back to shopping */

    if(cart.cartItems.length === 0
       ||  !userInfo
       ||  !paymentMethod
       ||  !shippingAddress ){
        
        history.push("/");
    }

    /* Calculate the shipping price, the tax price and the total price */

    if(cart.cartItems.length !== 0){

        /* if there is at least one item in the shopping cart */
        cart.itemsPrice = cart.cartItems.reduce((acc, item) => (acc + item.price * item.quantity) , 0);
        cart.itemsPrice = Number(cart.itemsPrice.toFixed(2));
        
        cart.shippingPrice = cart.itemsPrice >= 100.0 ? 0 : 10;
        /* the cart total is greater than 100 dollars, free shipping, else 10 dollars shipping */

        cart.taxPrice = Number((0.15 * (cart.itemsPrice)).toFixed(2)); // 15% taxation

        cart.totalPrice = Number((cart.itemsPrice + cart.shippingPrice + cart.taxPrice ).toFixed(2));


    }

    useEffect( () => {
        if(success){
            /* if the operation has been successfull,
               redirect to the order details page */
            history.push(`/order/${order._id}`);
        }
    }, [history, order._id, success])

    const placeOrderHandler = (event) => {
        /* this function is responsible for placing the order when clicked to the button */

        event.preventDefault();
        
        dispatch(createOrder( {
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod
        } ));
    }   

    return (
        <Container>
            <CheckoutSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="mb-1 mt-1">
                            <h2>Shipping</h2>
                            <p className="informativeItem">
                                <strong>Address:</strong>
                                {"  "}
                                {cart.shippingAddress.address},
                                {cart.shippingAddress.city} {"  "} {cart.shippingAddress.postalCode},
                                {"    " + cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item className="mb-1 mt-1">
                            <h2>Payment Method</h2>
                            <p className="informativeItem">
                                <strong>Method:  </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item className="mb-1 mt-1">
                            <h2>Order Items</h2>
                            <div className="mb-3"></div>
                            {cart.cartItems.length === 0 
                            ? <Message variant="danger">Your cart is empty!</Message>
                            : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map( (item, index) => (
                                        <ListGroup.Item key={index} className="mt-2 mb-2">
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image}
                                                           alt={item.name}
                                                           fluid
                                                           rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.quantity} x {item.price} = $ {item.quantity * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )
                            }        
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${cart.itemsPrice}</Col> 
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {loading && <Loader/>}
                            {error && <Message variant="danger">error</Message>}
                            <ListGroup.Item className="mt-1 p-1 align-items-center">
                                <Button type="button" 
                                        variant='dark' 
                                        className="col-12"
                                        disabled={cart.cartItems.length === 0}
                                        onClick={placeOrderHandler}>
                                            Place Order</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default PlaceOrder
