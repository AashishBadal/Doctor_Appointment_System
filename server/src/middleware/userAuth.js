import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/userModel.js"; // adjust path if needed

const userAuth = (allowedRoles = []) => {
    return async (req, res, next) => {
        try {
            const token = req.cookies.token; // or access_token if that's your naming
            if (!token) {
                throw new Error("Unauthorized. Please login again.", 401);
            }

            // Decode token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Check token expiry
            if (Date.now() > decoded.exp * 1000) {
                res.clearCookie("token", { maxAge: 0 });
                throw new Error("Token expired. Please login again.", 401);
            }

            // Find user in DB
            const user = await User.findById(decoded.id);
            if (!user) {
                throw new Error("User not found. Access denied.", 401);
            }

            // Check if role is allowed
            if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
                throw new Error("Forbidden. You do not have access to this resource.", 403);
            }

            // Attach user info to req
            req.user = {
                _id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            };

            // Optional: also inject into req.body if needed
            req.body = req.body || {};
            req.body.userId = user._id;
            req.body.role = user.role;

            next();
        } catch (error) {
            next(error);
        }
    };
};

export default userAuth;
