import express from 'express'

/* Import Actions from Controller */
import { authUser, getUserProfile, registerUser, updateUserProfile } from '../controllers/userController.js';

/* Import Middlewares */
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

// POST /api/users/login/
router.route("/login").post(authUser);

// /api/users/profile
router.route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

// POST /api/users
router.route("/").post(registerUser);

// PUT /api/users/profile
router.route("/profile")

export default router