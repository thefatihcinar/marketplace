import axios from 'axios'
import { CART_CLEAR_EVERYTHING } from '../constants/cartConstants.js';
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAILURE,
    ORDER_CREATE_CLEAR,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAILURE,
    ORDER_DETAILS_CLEAR
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

export const clearOrder = () => async(dispatch) => {
    /* this action creator is responsible for removing the global order create state */
    
    dispatch( { type: ORDER_CREATE_CLEAR } );
}

export const getOrderDetails = (id) => async(dispatch, getState) => {
    /* this action creator is responsible for communicating with the api
        and get order details to the redux global state */
    try {
        /* since this operation is private, go get the token */
        const { userLogin: { userInfo }} = getState();

        let config = {
            headers: {
                "Authentication": `Bearer ${userInfo.token}`
            }
        }

        dispatch( { type: ORDER_DETAILS_REQUEST } );

        let { data } = await axios.get(`/api/orders/${id}`, config);

        dispatch( { type: ORDER_DETAILS_SUCCESS, payload: data } );


    } catch (error) {
        
        dispatch( { type: ORDER_DETAILS_FAILURE, 
                    payload: error.response && error.response.data.message
                             ? error.response.data.message
                             : error.message 
                  } );

    }
}

export const clearOrderDetails = () => async(dispatch) => {
    /* this action creator clears the order details global state */
    
    dispatch( { type: ORDER_DETAILS_CLEAR } );
}