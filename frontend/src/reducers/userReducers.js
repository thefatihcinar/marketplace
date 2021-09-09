import { USER_LOGIN_REQUEST, 
         USER_LOGIN_SUCCESS, 
         USER_LOGIN_FAILURE, 
         USER_LOGOUT,
         USER_REGISTER_REQUEST,
         USER_REGISTER_SUCCESS,
         USER_REGISTER_FAILURE
        }
from '../constants/userConstants'

export const userLoginReducer = (state = {} , action) => {
    /* this reducer controls the user login state throughout the application */
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true };
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload};
        case USER_LOGIN_FAILURE:
            return { loading: false, error: action.payload};
        case USER_LOGOUT:
            return { };
        default:
            return state;
    }
}

export const userRegisterReducer = (state = {} , action) => {
    /* this reducer controls the user register state */
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_REGISTER_FAILURE:
            return { loading: false, error: action.payload};
        default:
            return state;
    }
}