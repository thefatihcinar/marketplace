import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
/* Actions */
import { addToCart } from '../actions/cartActions';


const ShoppingCart = ({ match, location }) => {
    /* first shopping cart component should process the incoming command
       the command is to add a product in the link to the shopping cart */
    
    let productId = match.params.id; // might be null if redirected to /cart
    
    // parse the query string,  e.g. ?quantity=3   => splitted to '?quantity', '1'
    let quantity = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch();

    useEffect( () => {
        // dispatch the action addToProduct if a prouct has been added to the cart
        if(productId){
            dispatch(addToCart(productId, quantity))
        }
    }, [dispatch, productId, quantity])

    return (
        <div>
            <span> THIS IS SHOPPING CART</span>
        </div>
    )
}

export default ShoppingCart
