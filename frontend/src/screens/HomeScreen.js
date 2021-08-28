import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'

const HomeScreen = () => {

    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        // This function is called when the component first loads and after each state change
        const fetchProducts = async () => {
            let {data} = await axios.get("/api/products");

            // Update the state, i.e. set products as state
            setProducts(data) // remember products as statE
        };

        // Call fetchProducts function
        fetchProducts();
    }, []);

    return (
        <div>
            <Container>
                <h1 className='mt-3'>Latest Products</h1>
                <Row>
                    {
                    products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product = {product}></Product>
                        </Col>
                    ))
                    }
                </Row>
            </Container>
        </div>
    )
}

export default HomeScreen
