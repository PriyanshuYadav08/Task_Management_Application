import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/auth.route";
import taskRoutes from "./routes/task.route";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// optional health
app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// error handler (last)
app.use(errorHandler);

export default app;