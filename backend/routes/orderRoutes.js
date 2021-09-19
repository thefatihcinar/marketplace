import express from 'express'
/* Controllers */
import { createOrder, getOrderById } from '../controllers/orderController.js';
/* Middlewares */
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.route("/").post(protect, createOrder);

router.route("/:id").get(protect, getOrderById);

export default router