import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
/* Actions */
import { listProducts } from '../actions/productActions'
import { clearOrder } from '../actions/orderActions'

const HomeScreen = () => {

    // Get the global level state from redux
    let { products, loading, error} = useSelector( state => state.productList);

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(listProducts())
        
        /* if the user have come here after having placed an order,
           clear order from global state */
        dispatch(clearOrder());
    }, [dispatch]);

    return (
        <div>
            <Container>
                <h1 className='mt-3'>Latest Products</h1>
                {loading ? (<Loader/>)
                :error ? (<Message variant = "danger">{error}</Message>)
                :(<Row>
                    {
                    products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product = {product}></Product>
                        </Col>
                     ))
                    }
                </Row>)
                }
                
            </Container>
        </div>
    )
}

export default HomeScreen
