import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dev-secret";

export function signToken(userId: string) {
  return jwt.sign({ sub: userId }, SECRET, { expiresIn: "1h" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET) as any;
}