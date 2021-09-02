import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
/* Import Reducers */
import { productListReducer } from './reducers/productReducers'


let reducers = combineReducers({
    productList: productListReducer
});

const middleware = [thunk]

const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middleware)));

export default store;