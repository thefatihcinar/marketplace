import { createStore, combineReducers } from 'react-redux'

/* Import Reducers */
import productListReducer from './reducers/productReducers'

let reducers = combineReducers({
    productList: productListReducer
});

const store = createStore(reducers);

export default store;