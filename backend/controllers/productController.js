import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


// @desc    get all the products
// @route   GET /api/products
// @access  Public 
const listProducts = asyncHandler (async (request, response) => {
    /* This function will return all the products */

    let products = await Product.find({})

    response.json(products)
});



// @desc    get a single product by id
// @route   GET /api/products/:id
// @access  Public
const getProduct = asyncHandler (async (request, response) => {
    /* this function will return a single product */

    let productId = request.params.id

    let product = await Product.findById(productId)

    if(product) {
        response.json(product)
    }
    else{
        // product not found
        response.status(404)
        throw new Error('product not found')
    }

});

export { listProducts, 
         getProduct }