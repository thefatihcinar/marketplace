import express from 'express'
/* Controllers */
import { createOrder } from '../controllers/orderController.js';
/* Middlewares */
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.route("/").post(protect, createOrder);

export default router