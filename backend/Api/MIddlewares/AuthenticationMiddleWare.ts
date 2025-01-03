import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function AuthenticationMiddleWare(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  //TODO: Implement this Middleware
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
    req.body.userId = decoded;
    next();
  } catch (error: any) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}
