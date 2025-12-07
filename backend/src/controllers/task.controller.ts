// backend/src/controllers/task.controller.ts
import { Request, Response } from "express";
import mongoose from "mongoose";
import { Task } from "../models/Task";
import { AuthRequest } from "../middleware/auth.middleware";

const ALLOWED_UPDATE_FIELDS = ["title", "description", "status"] as const;
type AllowedField = typeof ALLOWED_UPDATE_FIELDS[number];
const STATUS_VALUES = ["pending", "completed"] as const;

function isValidStatus(v: any): v is (typeof STATUS_VALUES)[number] {
  return STATUS_VALUES.includes(v);
}

export async function listTasks(req: AuthRequest, res: Response) {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const tasks = await Task.find({ owner: userId }).sort({ createdAt: -1 });
    return res.json(tasks);
  } catch (err: any) {
    console.error("listTasks error:", err);
    return res.status(500).json({ message: "Failed to list tasks" });
  }
}

export async function createTask(req: AuthRequest, res: Response) {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { title, description, status } = req.body ?? {};

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return res.status(400).json({ message: "Title required" });
    }

    if (status !== undefined && !isValidStatus(status)) {
      return res.status(400).json({ message: `Invalid status. Allowed: ${STATUS_VALUES.join(", ")}` });
    }

    const t = new Task({
      title: title.trim(),
      description: typeof description === "string" ? description.trim() : undefined,
      status: status ?? "pending",
      owner: new mongoose.Types.ObjectId(userId),
    });

    await t.save();
    return res.status(201).json(t);
  } catch (err: any) {
    console.error("createTask error:", err);
    return res.status(500).json({ message: "Failed to create task" });
  }
}

export async function updateTask(req: AuthRequest, res: Response) {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { id } = req.params;
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid task id" });
    }

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (String(task.owner) !== String(userId)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // Only allow certain fields to be updated
    const updates: Partial<Record<AllowedField, any>> = {};
    for (const field of ALLOWED_UPDATE_FIELDS) {
      if (field in req.body) updates[field] = req.body[field];
    }

    if (updates.status !== undefined && !isValidStatus(updates.status)) {
      return res.status(400).json({ message: `Invalid status. Allowed: ${STATUS_VALUES.join(", ")}` });
    }

    // apply updates
    for (const [k, v] of Object.entries(updates)) {
      // @ts-ignore - safe because we control allowed fields
      task[k] = typeof v === "string" ? v.trim() : v;
    }

    await task.save();
    return res.json(task);
  } catch (err: any) {
    console.error("updateTask error:", err);
    return res.status(500).json({ message: "Failed to update task" });
  }
}

export async function deleteTask(req: AuthRequest, res: Response) {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { id } = req.params;
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid task id" });
    }

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (String(task.owner) !== String(userId)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await task.deleteOne();
    return res.status(204).send();
  } catch (err: any) {
    console.error("deleteTask error:", err);
    return res.status(500).json({ message: "Failed to delete task" });
  }
}