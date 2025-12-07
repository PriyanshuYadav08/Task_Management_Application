// backend/src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Make AuthRequest extend Request so we can attach userId
export interface AuthRequest extends Request {
  userId?: string;
}

// Ensure at startup that we have a secret (fail fast)
const JWT_SECRET: string = (() => {
  if (!process.env.JWT_SECRET) {
    console.warn("⚠️  Warning: JWT_SECRET not set. Using development fallback (insecure).");
    // for dev only; consider throwing in production:
    return "dev-secret";
  }
  return process.env.JWT_SECRET;
})();

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "Missing Authorization header" });
  }
  if (!header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid Authorization format" });
  }

  const token = header.slice(7); // remove 'Bearer '

  try {
    // jwt.verify returns string | object, so we type it appropriately
    const payload = jwt.verify(token, JWT_SECRET) as { sub?: string; iat?: number; exp?: number } | string;

    // if jwt.verify returns a string payload (unlikely for our usage), reject
    if (typeof payload === "string") {
      console.error("Auth: unexpected string payload from jwt.verify");
      return res.status(401).json({ message: "Invalid token payload" });
    }

    // payload.sub should contain user id
    if (!payload?.sub) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    req.userId = String(payload.sub);
    return next();
  } catch (err: any) {
    // helpful logging for dev
    console.error("Auth middleware — token verification failed:", err?.message ?? err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}