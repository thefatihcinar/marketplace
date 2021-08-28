import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to = {`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top'/>
            </Link>
            <Card.Body as = 'div'>
                <Link to = {`/product/${product._id}`}>
                    <Card.Title style = {{color:'black'}}>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as = 'div'>
                    <div className = 'mt-3'>
                        <Rating rating = {product.rating} 
                                numReviews = {product.numReviews}
                                color = 'orange'></Rating>
                    </div>
                </Card.Text>
                <Card.Text>
                    <strong>${product.price}</strong>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
