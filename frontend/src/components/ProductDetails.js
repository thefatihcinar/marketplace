import React from 'react'
import { Row, Col, Container, Button, Image, ListGroup, ListGroupItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Rating from './Rating'
import products from '../products'

const ProductDetails = ({ match }) => {

    const productId = match.params.id; // Get the product id from the route

    const product = products.find( p => p._id === productId); // Get the actual product

    return (
        <Container>
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
                    </ListGroup>
                    <ListGroup.Item>
                        <LinkContainer to='/' className='text-center'>
                            <Button className='btn col-12' 
                                type='button' 
                                variant='dark'
                                disabled={product.countInStock === 0 ? true: false}
                                >Add to Cart</Button>
                        </LinkContainer>
                    </ListGroup.Item>
                </Col>
            </Row>
        </Container>
    )
}

export default ProductDetails
