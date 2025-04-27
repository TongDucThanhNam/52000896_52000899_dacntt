import type { Context, Next } from "hono";
import {decode, verify} from "hono/jwt";
import dotenv from "dotenv";

dotenv.config();

export async function AuthenticationMiddleWare(
    c: Context,
    next: Next
) {
    // Extract the Authorization header; expecting "Bearer <token>"
    const authHeader = c.req.header('authorization');
    console.log("Auth header: ", authHeader)
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
        const secret = process.env.JWT_SECRET || 'fashionAIToken';
        console.log("Secret: ", secret)

        console.log("Token: ", token)

        const result = await verify(token, secret);

        const decoded = await verify(token, secret);

        console.log("Decoded: ", decoded)
        console.log("Decoded JSON: ", JSON.stringify(decoded));
        const { header, payload } = decode(token)

        console.log('Decoded Header:', header)
        console.log('Decoded Payload:', payload)

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
        // Hono's JWT errors are more generic, so we'll handle them based on error message
        if (error.message.includes("expired")) {
            return c.json(
                {message: "Unauthorized: Token has expired. Please log in again."},
                401
            );
        } else if (error.message.includes("invalid")) {
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
