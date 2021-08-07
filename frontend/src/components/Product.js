import React from 'react'
import { Card } from 'react-bootstrap'

const Product = ({ product }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <a href = {`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top'/>
            </a>
            <Card.Body as = 'div'>
                <a href = {`/product/${product._id}`}>
                    <Card.Title>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </a>
                <Card.Text as = 'div'>
                    <div className = 'mt-3'>
                        {product.rating} from {product.numReviews} reviews
                    </div>
                </Card.Text>
                <Card.Text>
                    {product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
