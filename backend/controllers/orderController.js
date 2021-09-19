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

          /* Update product's stock */
          product.countInStock = product.countInStock - orderItem.quantity;
          await product.save();

          /* Check & Update Order Items if Changed */
          orderItem.name = product.name;
          orderItem.price = product.price;
          orderItem.countInStock = product.countInStock;
          orderItem.image = product.image;
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

// @desc    get specific order by id
// @route   GET /api/orders/:id
// @access  private
const getOrderById = asyncHandler( async (request, response) => {
    /* this action returns a specific order requested by an id 
        other than admin and this specific user, no one else should access this 
        order */
    let orderId = request.params.id;

    try {
        
        let order = await Order.findById(orderId).populate("user", "name email");

        if(!order){
            /* if the order is null
                in order words, not found */
            response.status(404);
            throw new Error("order not found");
        }
        
        response.json(order);

    } catch (error) {
        /* there might have been a CastError or another error type
            just say that it has not found */
        
        response.status(404);
        throw new Error("order not found");

    }
    
})

export { createOrder, getOrderById }