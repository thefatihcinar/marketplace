import { CART_ADD_ITEM, 
         CART_REMOVE_ITEM,
         CART_SAVE_SHIPPING_ADDRESS,
         CART_SAVE_PAYMENT_METHOD
} from "../constants/cartConstants";


export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
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
            return {
                ...state,
                cartItems: state.cartItems
                            .filter((item) => item.product !== action.payload)
            };
        case CART_SAVE_SHIPPING_ADDRESS:
                return {
                    ...state,
                    shippingAddress: action.payload
                }
        case CART_SAVE_PAYMENT_METHOD:
                return {
                    ...state,
                    paymentMethod: action.payload
                }
        default:
            return state;
    }
};


