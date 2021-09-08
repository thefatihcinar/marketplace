/* all the routes that start with /api/products will be forwarded 
to this router by the server.js i.e. main app */
import express from 'express'
/* Actions from Controller */
import { listProducts, getProduct } from '../controllers/productController.js'

const router = express.Router()

router.route("/").get(listProducts);

router.route("/:id").get(getProduct);

export default router