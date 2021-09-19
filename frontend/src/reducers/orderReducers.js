import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAILURE
}
from '../constants/orderConstants'

const orderCreateReducer = (state = {}, action) => {
    /* this reducer is responsible for handling the order state 
    throughout the application */
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true };
        case ORDER_CREATE_SUCCESS:
            return { loading: false, success: true, order: action.payload};
        case ORDER_CREATE_FAILURE:
            return { loading: false, error: action.payload};
        default:
            return state;
    }
}