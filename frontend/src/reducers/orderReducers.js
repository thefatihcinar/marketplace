import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAILURE,
    ORDER_CREATE_CLEAR,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAILURE,
    ORDER_DETAILS_CLEAR
}
from '../constants/orderConstants'

export const orderCreateReducer = (state = {}, action) => {
    /* this reducer is responsible for handling the order state 
    throughout the application */
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true };
        case ORDER_CREATE_SUCCESS:
            return { loading: false, success: true, order: action.payload};
        case ORDER_CREATE_FAILURE:
            return { loading: false, error: action.payload};
        case ORDER_CREATE_CLEAR:
            return {}
        default:
            return state;
    }
}

export const orderDetailsReducer = (state = { orderItems: [], shippingAddress: {} } , action) => {
    /* this reducer is responsible for handling the order details
        throughout the application */
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:            
            return {...state, 
                    loading: true};
        case ORDER_DETAILS_SUCCESS:
            return { loading: false, order: action.payload};
        case ORDER_DETAILS_FAILURE:
            return { loading: false, error: action.payload};
        case ORDER_DETAILS_CLEAR:
            return { orderItems: [], shippingAddress: {}}
        default:
            return state;
    }
}