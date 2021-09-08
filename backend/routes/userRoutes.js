import express from 'express'

/* Import Actions from Controller */
import { authUser } from '../controllers/userController.js';

const router = express.Router();

// POST /api/login/
router.route("/login").post(authUser);

export default router