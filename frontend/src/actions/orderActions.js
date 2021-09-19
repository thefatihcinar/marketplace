import axios from 'axios'
import { CART_CLEAR_EVERYTHING } from '../constants/cartConstants.js';
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAILURE
} from '../constants/orderConstants.js'

export const createOrder = (order) => async(dispatch, getState) =>  {
    /* this action creator is responsible of communicating 
        with the API and creating an order */
    
    try {
        /* First get the logged in user in order to access token */
        const { userLogin: { userInfo } } = getState();
    
        dispatch( { type: ORDER_CREATE_REQUEST } );
    
        let config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userInfo.token}`
            }
        }
    
        let { data } = await axios.post("/api/orders", order, config);
    
        dispatch( { type: ORDER_CREATE_SUCCESS, payload: data} );

        /* Clear shopping cart after having placed the order */
        dispatch( { type: CART_CLEAR_EVERYTHING } );

    } catch (error) {
        
        dispatch( { type: ORDER_CREATE_FAILURE,
                    payload: error.response && error.response.data.message
                             ? error.response.data.message
                             : error.message} )
    }
}

