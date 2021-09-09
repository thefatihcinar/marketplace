import axios from 'axios'
import {
    USER_LOGIN_FAILURE,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS
}
from '../constants/userConstants'

export const login = (email, password) => async(dispatch) => {
    /* this action creator logs in a user by connecting to the api
       and getting the user and the token */
    try {

        dispatch( { type: USER_LOGIN_REQUEST } )

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        let { data }  = await axios.post('/api/users/login', { email: email, password: password}, config);
        
        dispatch( { type: USER_LOGIN_SUCCESS, payload: data } )

        // Remember the user, in local storage

        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        // when the authentication fails
        dispatch({
            type: USER_LOGIN_FAILURE,
            payload: error.response && error.response.data.message
                     ? error.response.data.message
                     : error.message
        })
    }
}