import type {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";

export async function AuthenticationMiddleWare(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // Extract the Authorization header; expecting "Bearer <token>"
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res
            .status(400)
            .json({message: "Bad Request: Authorization header not provided."});
    }

    const parts = authHeader.split(" ");
    let token = "";
    if (parts.length === 2 && parts[0].toLowerCase() === "bearer") {
        token = parts[1];
    } else if (parts.length === 1) {
        token = parts[0];
    } else {
        return res.status(400).json({
            message:
                "Bad Request: Authorization header format is invalid. Expected format: Bearer <token>.",
        });
    }

    if (!token) {
        return res.status(400).json({message: "Bad Request: Token not provided."});
    }

    try {
        const secret = process.env.JWT_SECRET || "fashionAI";
        const decoded: any = jwt.verify(token, secret);

        if (!decoded || !decoded.userId) {
            return res
                .status(403)
                .json({message: "Forbidden: Token verification failed. Invalid token payload."});
        }

        // Attach userId to request body for further handlers
        req.body.userId = decoded.userId;
        next();
    } catch (error: any) {
        console.error("Authentication middleware error:", error);
        if (error.name === "TokenExpiredError") {

            return res
                .status(401)
                .json({message: "Unauthorized: Token has expired. Please log in again."});
        } else if (error.name === "JsonWebTokenError") {
            return res
                .status(401)
                .json({message: "Unauthorized: Invalid token. Please log in again."});
        }
        return res
            .status(500)
            .json({message: "Internal Server Error: An error occurred during token verification."});
    }
}