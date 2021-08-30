/* all the routes that start with /api/products will be forwarded 
to this router by the server.js i.e. main app */
import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const router = express.Router()

// @desc    get all the products
// @route   GET /api/products
// @access  Public 
router.get("/", asyncHandler (async (request, response) => {
    /* This function will return all the products */

    let products = await Product.find({})

    response.json(products)
}));

// @desc    get a single product by id
// @route   GET /api/products/:id
// @access  Public
router.get("/:id", asyncHandler (async (request, response) => {
    /* this function will return a single product */

    let productId = request.params.id

    let product = await Product.findById(productId)

    if(product) {
        response.json(product)
    }
    else{
        // product not found
        response.status(404).json( { message: "product not found"} )
    }

}));


export default router