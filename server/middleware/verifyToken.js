import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const verifyToken = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return next(createError(401, "You are not authenticated!"));
        }

        const token = req.headers.authorization.split(" ")[1]; // Extract token after "Bearer"
        if (!token) {
            return next(createError(401, "Token missing, you are not authenticated"));
        }

        // Verify the token with the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure process.env.JWT_SECRET is correctly set
        req.user = decoded; // Attach user data to the request object for later use
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return next(createError(401, "Token has expired"));
        }
        return next(createError(401, "Invalid or malformed token"));
    }
};
