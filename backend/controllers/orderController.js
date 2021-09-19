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

      /* Check whether payment method is supported */
      let supportedPaymentMethods = ["PayPal"];
  
      if(!supportedPaymentMethods.includes(paymentMethod)){
          // if this payment method is not supported
          response.status(400);
          throw new Error("payment method is not supported");
          return;
      }

      /* For each order item, fetch prices from database */
  
      let itemsPrice = 0;
  
      for(let orderItem of orderItems){
          console.log(orderItem)
          if(orderItem.quantity <= 0 || !Number.isInteger(orderItem.quantity)){
              // if a negative or decimal value has been entered for quantity 
              // do not let it
              response.status(400);
              throw new Error("quantity must be a positive integer");
              return
          }
  
          let product = await Product.findById(orderItem.product);
          
          if(!product){
              response.status(400);
              throw new Error("product not found");
              return;
          }
          
          // Check stock
          if(orderItem.quantity > product.countInStock){
              // if the amount is larger than the count in stock
              response.status(400);
              throw new Error("not enough products in stocks");
              return;
          }
  
          itemsPrice += product.price * orderItem.quantity;

         
      }
  
      let shippingPrice;
  
      // Calculate the shipping price as well
      if(itemsPrice >= 100){
          shippingPrice = 0;
      }
      else{
          shippingPrice = 10;
      }
  
      // Calculate tax price, 15% tax rate
      let taxPrice;
      taxPrice = itemsPrice * 0.15;   
  
      // Total Price
      let totalPrice;
      totalPrice = itemsPrice + shippingPrice + taxPrice;

    // Add this order to the database
  
    let newOrder = await Order.create({
        user: request.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    });

    response.status(201).json(newOrder);
})

export { createOrder }