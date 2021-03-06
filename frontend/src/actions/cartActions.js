import axios from 'axios'
import { CART_ADD_ITEM, 
         CART_REMOVE_ITEM,
         CART_SAVE_SHIPPING_ADDRESS,
         CART_SAVE_PAYMENT_METHOD,
         CART_CLEAR_EVERYTHING
        } from '../constants/cartConstants';

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

    
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));

};


export const removeFromCart = (productId) => async(dispatch, getState) => {
    /* this action creator removes an item from the shopping cart */

    dispatch( { type: CART_REMOVE_ITEM, payload: productId } )

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const cleartEverythingAboutCart = () => async(dispatch) => {
    /* this action creator is responsible for clearing up the shopping cart */

    dispatch( { type: CART_CLEAR_EVERYTHING } );
}

export const saveShippingAddress = (address) => async(dispatch) => {
    /* this action creator is responsible for remembering / keeping the 
       address entered by the user
    */
    dispatch( { type: CART_SAVE_SHIPPING_ADDRESS, payload: address} );

    // Also keep it in local storage
    localStorage.setItem('shippingAddress' , JSON.stringify(address));
}

export const savePaymentMethod = (paymentMethod) => async(dispatch) => {
    /* this action creator remembers the chosen payment method globally */
    
    dispatch( { type: CART_SAVE_PAYMENT_METHOD, payload: paymentMethod} )

    /* also store the payment method in local storage as well */
    localStorage.setItem("paymentMethod", paymentMethod);
}

