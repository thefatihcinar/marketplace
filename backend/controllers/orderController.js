import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'

// @desc    create new order
// @route   POST /api/orders
// @access  private
const createOrder = asyncHandler( async (request, response) => {
    /* this controller action is responsible for adding a new order
       to the database */
    
    let {   
        orderItems,
        shippingAddress,
        paymentMethod
      } = request.body;
  
      if(!orderItems){
          response.status(400);
          throw new Error("there are no valid order items");
          return;
      }
  
      if(!shippingAddress){
          response.status(400);
          throw new Error("shipping address is not provided");
          return;
      }
  
      if(!paymentMethod){
          response.status(400);
          throw new Error("payment method is not provided");
          return;
      }
  
      if(orderItems && orderItems.length === 0){
          response.status(400);
          throw new Error("no order items");
          return;
      }
})