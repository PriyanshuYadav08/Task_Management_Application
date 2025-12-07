import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { signToken } from "../utils/jwt";

export async function register(req: Request, res: Response) {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "Missing fields" });

  const existing = await User.findOne({ username });
  if (existing) return res.status(409).json({ message: "Username taken" });

  const hash = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hash });
  await user.save();

  res.status(201).json({ id: user._id, username: user.username });
}

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "Missing fields" });

  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = signToken(String(user._id));
  res.json({ token });
}

export async function me(req: any, res: Response) {
  const userId = req.userId;
  const user = await User.findById(userId).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
}