import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";


export const cartReducer = (state = { cartItems: [] }, action) => {
    /* this reducer will add to remove cartItems in to the shopping cart state */

    switch (action.type) {
        case CART_ADD_ITEM:
            let item = action.payload; // this is the items desired to be added
            let exist = state.cartItems.find( cartItem => cartItem.product === item.product);
            if(exist) {
                // if the item alread exists in the shopping cart, override it
                return {...state,
                       cartItems: state.cartItems
                            .map(cartItem => cartItem.product === exist.product ? item : cartItem)}
            }
            else return {...state, cartItems: [...state.cartItems, item]};
        case CART_REMOVE_ITEM:
            // TO- DO
            return state;
        default:
            return state;
    }
};


