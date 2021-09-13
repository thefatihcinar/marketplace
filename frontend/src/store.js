import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
/* Import Reducers */
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userDetailsReducer, userLoginReducer, 
         userRegisterReducer, userUpdateProfileReducer } from './reducers/userReducers'

let reducers = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer
});

/* load the cart items when the application loads */
let cartItemsFromLocalStorage = localStorage.getItem('cartItems')
                                ? JSON.parse(localStorage.getItem('cartItems'))
                                : [];

let userInfoFromLocalStorage = localStorage.getItem('userInfo')
                               ? JSON.parse(localStorage.getItem('userInfo'))
                               : null;

let shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress') 
                                      ? JSON.parse( localStorage.getItem('shippingAddress') )
                                      : { };

/* initial state of the application is stored here */
let initialState = {
    cart: { cartItems: cartItemsFromLocalStorage, 
            shippingAddress: shippingAddressFromLocalStorage},
    userLogin: { userInfo: userInfoFromLocalStorage }
};

const middleware = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;