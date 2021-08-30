/* all the routes that start with /api/products will be forwarded 
to this router by the server.js i.e. main app */
import express from 'express'
import Product from '../models/productModel'

const router = express.Router()

// Path: /api/products
router.get("/", async (request, response) => {
    /* This function will return all the products */

    let products = await Product.find({})

    response.json(products)
});

// Path: /api/products/:id
router.get("/:id", async (request, response) => {
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

});


export default router