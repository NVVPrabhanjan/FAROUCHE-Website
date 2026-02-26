import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";


export const isAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided", success: false });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret_dont_use_in_prod");
        const admin = await Admin.findById(decoded.userId).select("-password");

        if (!admin) {
            return res.status(401).json({ message: "Unauthorized - Invalid Admin", success: false });
        }

        req.admin = admin;
        next();

    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return res.status(401).json({ message: "Unauthorized - Invalid Token", success: false });
    }
};


export const requireRole = (...roles) => (req, res, next) => {
    if (!req.admin || !roles.includes(req.admin.role)) {
        return res.status(403).json({
            message: `Forbidden — requires one of: ${roles.join(", ")}`,
            success: false,
        });
    }
    next();
};

