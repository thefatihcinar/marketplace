import express from 'express'

/* Import Actions from Controller */
import { authUser, getUserProfile, registerUser } from '../controllers/userController.js';

/* Import Middlewares */
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

// POST /api/users/login/
router.route("/login").post(authUser);

// GET /api/users/profile
router.route("/profile").get(protect, getUserProfile);

// POST /api/users
router.route("/").post(registerUser);

export default router