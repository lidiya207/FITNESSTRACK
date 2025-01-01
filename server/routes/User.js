import express from "express";
import { getUserDashboard, UserLogin, UserRegister } from "../controller/User.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Route for user registration
router.post("/signup", UserRegister);

// Route for user login
router.post("/signin", UserLogin);

// Protected route for user dashboard, requires token verification
router.get("/dashboard", verifyToken, getUserDashboard);

export default router;
