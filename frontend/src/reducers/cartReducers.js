import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";


export const cartReducer = (state = { cartItems: [] }, action) => {
    /* this reducer will add to remove cartItems in to the shopping cart state */

    switch (action.type) {
        case CART_ADD_ITEM:
            
            break;
        case CART_REMOVE_ITEM:
            // TO- DO
            return state;
        default:
            return state;
    }
};


