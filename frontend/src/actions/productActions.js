import { PRODUCT_LIST_REQUEST, 
         PRODUCT_LIST_SUCCESS, 
         PRODUCT_LIST_FAIL,
         PRODUCT_DETAILS_REQUEST,
         PRODUCT_DETAILS_SUCCESS,
         PRODUCT_DETAILS_FAIL
        } 
from "../constants/productConstants";
import axios from 'axios'

export const listProducts = () => async(dispatch) => {
    try {
        dispatch( { type: PRODUCT_LIST_REQUEST })

        const { data } = await axios.get('/api/products');

        dispatch( { type: PRODUCT_LIST_SUCCESS, payload: data})
        
    } catch (error) {
        // If there has been an error
        dispatch( { type: PRODUCT_LIST_FAIL, 
                    payload: error.response && error.response.data.message
                             ? error.response.data.message
                             : error.message
                })
    }
}


export const productDetails = (id) => async(dispatch) => {
    /* this function (a.k.a. action creator) is responsible with communication
        with the server, has side effects and dispatches actions */
    try {
        dispatch( { type: PRODUCT_DETAILS_REQUEST })

        let { data } = await axios.get(`/api/products/${id}`)

        dispatch( { type: PRODUCT_DETAILS_SUCCESS , payload: data } )

    } catch (error) {
        // an error occured while connecting to the api
        dispatch( { type: PRODUCT_DETAILS_FAIL, 
            payload: error.response && error.response.data.message
                             ? error.response.data.message
                             : error.message
        } )
    }
}