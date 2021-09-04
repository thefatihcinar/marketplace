import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const addToCart = (productId, quantity) => async(dispatch, getState) => {
    /* this action creator adds a new item to the shopping cart
       it connects to the API to thet the product details and returns
       actions to add to the global state */
    
    const { data } = await axios.get(`/api/products/${productId}`);

    /* create the item object */

    let item = {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        quantity: quantity
    };

    /* return the action */
    dispatch( {
        type: CART_ADD_ITEM,
        payload : item 
    } )

    localStorage.setItem('cartItems', JSON.stringify(getState.cart.cartItems));

};
