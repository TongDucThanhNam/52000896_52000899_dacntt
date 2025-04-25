import type { Context, Next } from "hono";
import jwt from "jsonwebtoken";

export async function AuthenticationMiddleWare(
    c: Context,
    next: Next
) {
    // Extract the Authorization header; expecting "Bearer <token>"
    const authHeader = c.req.header('authorization');
    if (!authHeader) {
        return c.json(
            {message: "Bad Request: Authorization header not provided."},
            400
        );
    }

    const parts = authHeader.split(" ");
    let token = "";
    if (parts.length === 2 && parts[0].toLowerCase() === "bearer") {
        token = parts[1];
    } else if (parts.length === 1) {
        token = parts[0];
    } else {
        return c.json({
            message:
                "Bad Request: Authorization header format is invalid. Expected format: Bearer <token>.",
        }, 400);
    }

    if (!token) {
        return c.json({message: "Bad Request: Token not provided."}, 400);
    }

    try {
        const secret = process.env.JWT_SECRET || "fashionAI";
        const decoded: any = jwt.verify(token, secret);

        if (!decoded || !decoded.userId) {
            return c.json(
                {message: "Forbidden: Token verification failed. Invalid token payload."},
                403
            );
        }

        // Store userId in the context variables for further handlers
        c.set('userId', decoded.userId);

        // Continue to the next middleware or route handler
        await next();
    } catch (error: any) {
        console.error("Authentication middleware error:", error);
        if (error.name === "TokenExpiredError") {
            return c.json(
                {message: "Unauthorized: Token has expired. Please log in again."},
                401
            );
        } else if (error.name === "JsonWebTokenError") {
            return c.json(
                {message: "Unauthorized: Invalid token. Please log in again."},
                401
            );
        }
        return c.json(
            {message: "Internal Server Error: An error occurred during token verification."},
            500
        );
    }
}
