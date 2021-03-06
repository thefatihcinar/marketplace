import React, { useState, useEffect } from 'react'
import { Row, Col, Container, Button, Image, ListGroup, ListGroupItem, Form } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Rating from './Rating'
import Loader from './Loader'
import Message from './Message'
import { useDispatch, useSelector } from 'react-redux'
/* Actions */
import { productDetails } from '../actions/productActions'

const ProductDetails = ({ history, match }) => {

    let productId = match.params.id; // Get the product id from the route

    let [quantity, setQuantity] = useState(1);
    /* this state stores the amount to buy *

    /* get the global state for this product */
    let { product , loading, error} = useSelector( state => state.productDetails)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productDetails(productId))
    }, [dispatch, productId]);

    /* this function is responsible for handling add to cart operations */
    const addToCartHandler = () => {
        history.push(`/cart/${productId}?quantity=${quantity}`)
    }

    return (
        <Container>
            {loading ? (<Loader/>)
             : error ? (<Message variant="danger">{error}</Message>)
             : (<Container>
                <LinkContainer to='/'>
                    <Button variant='light' className='my-3 p-2'>
                        Go Back
                    </Button>
                </LinkContainer>
                    <Row>
                        {/* Product Image Part*/}
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid/>
                        </Col>
                        {/* Product Details Part*/}
                        <Col md={3}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroupItem>
                                    <Rating rating={product.rating} numReviews={product.numReviews}/>
                                </ListGroupItem>
                                <ListGroup.Item>
                                    Price: <strong>${product.price}</strong>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        {/* Order Part */}   
                        <Col md={3}>
                            <ListGroup>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col><strong>${product.price}</strong></Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</Col>
                                    </Row>
                                </ListGroup.Item>
                                {product.countInStock > 0 ?
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Quantity:</Col>
                                            <Col>
                                                <Form.Control
                                                    as="select"
                                                    value={quantity}
                                                    onChange={ (event) => (setQuantity(event.target.value))}>
                                                    {
                                                        [...Array(product.countInStock).keys()]
                                                            .map( (index) => (
                                                                <option key={index+1} value={index+1}>{index+1}</option>
                                                            ))
                                                    }
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                </ListGroup.Item>
                                : ""}
                            </ListGroup>
                            <ListGroup.Item>
                                <Button className='btn col-12' 
                                            type='button' 
                                            variant='dark'
                                            disabled={product.countInStock === 0 ? true: false}
                                            onClick={addToCartHandler}
                                            >Add to Cart
                                </Button>
                            </ListGroup.Item>
                        </Col>
                    </Row>
                </Container>)}
        </Container>
    )
}

export default ProductDetails
