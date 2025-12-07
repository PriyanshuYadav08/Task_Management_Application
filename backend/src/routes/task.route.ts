import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import { listTasks, createTask, updateTask, deleteTask } from "../controllers/task.controller";

const router = Router();
router.get("/", requireAuth, listTasks);
router.post("/", requireAuth, createTask);
router.put("/:id", requireAuth, updateTask);
router.delete("/:id", requireAuth, deleteTask);

export default router;