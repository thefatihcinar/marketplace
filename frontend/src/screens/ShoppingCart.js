import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import { Row, Col, Container, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
/* Actions */
import { addToCart, removeFromCart } from '../actions/cartActions';


const ShoppingCart = ({ match, location, history }) => {
    /* first shopping cart component should process the incoming command
       the command is to add a product in the link to the shopping cart */
    
    let productId = match.params.id; // might be null if redirected to /cart
    
    // parse the query string,  e.g. ?quantity=3   => splitted to '?quantity', '1'
    let quantity = location.search ? Number(location.search.split('=')[1]) : 1
    
    const dispatch = useDispatch();

    const cart = useSelector( state => state.cart );
    const { cartItems } = cart;

    useEffect( () => {
        // dispatch the action addToProduct if a prouct has been added to the cart
        if(productId){
            dispatch(addToCart(productId, quantity))
        }
    }, [dispatch, productId, quantity])

    const removeFromCartHandler = (productIdToRemove) => {

        dispatch(removeFromCart(productIdToRemove))
    };

    const checkOutHandler = () => {
        history.push("/login?redirect=shipping");
    };

    return (
        <Container>
            <Row>
                {/* Shopping Cart Items */}
                <Col md={8}>
                    <div className="shoppingCartTitle">
                        <h1>Shopping Cart</h1>
                    </div>
                    {cartItems.length === 0 ? <Message theMessage="Your cart is empty."></Message>
                    : <ListGroup variant="flush">
                        {cartItems.map( (item) => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded></Image>
                                    </Col>
                                    <Col md={5}>
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>
                                    </Col>
                                    <Col md={2}>${item.price}</Col>
                                    <Col md={2}>
                                        <Form.Control
                                            as="select"
                                            value={item.quantity}
                                            onChange={(event) => (dispatch(addToCart(item.product, Number(event.target.value)))) }
                                        >
                                            {[...Array(item.countInStock).keys()].map( (index) => (
                                                <option key={index+1} value={index+1}>{index+1}</option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={1}>
                                        <Button
                                            variant="light"
                                            onClick={() => removeFromCartHandler(item.product)}>
                                            <i className="fas fa-trash"></i>        
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>}
                </Col>
                {/* Cart Total and Proceed to Checkout Part */}
                <Col md={3}> 
                    <Card className="checkOutPart">
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <div className="subtotalItems">
                                    <h5>Subtotal ({cartItems.reduce( (acc, item) => acc + item.quantity ,0)}) items</h5>
                                <div className="totalPriceTag">$ {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</div>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type="button" 
                                        variant="dark"
                                        className="btn col-12 btn-block" 
                                        disabled={cartItems.length === 0}
                                        onClick={checkOutHandler}>
                                    Proceed to Checkout
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                    
                </Col>
            </Row>
        </Container>
    )
}

export default ShoppingCart
