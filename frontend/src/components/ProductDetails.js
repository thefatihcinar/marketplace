import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Row, Col, Container, Button, Image, ListGroup, ListGroupItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Rating from './Rating'

const ProductDetails = ({ match }) => {

    const [product, setProduct] = useState({}); 
    // this functional component better have a product as its state, and it will be updated

    const productId = match.params.id; // Get the product id from the route

    useEffect(() => {
        // this function will be called first when the component loads and after each state change
        const fetchProduct = async () => {
            let { data } = await axios.get(`/api/products/${productId}`);

            setProduct(data); // update the state
        };

        // call this fetch function
        fetchProduct();
    }, [productId]);

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
