import React from 'react'
import './cartItemsCountIndicator.css'

const CartItemsCountIndicator = ({ count }) => {
    return (
        <div className="cartItemsCountIndicator">
            <strong>{count}</strong>
        </div>
    )
}

CartItemsCountIndicator.defaultProps = {
    count: 0
}

export default CartItemsCountIndicator
