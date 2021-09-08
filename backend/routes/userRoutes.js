import express from 'express'

/* Import Actions from Controller */
import { authUser, getUserProfile } from '../controllers/userController.js';

const router = express.Router();

// POST /api/users/login/
router.route("/login").post(authUser);
// GET /api/users/profile
router.route("/profile").get(getUserProfile);

export default router