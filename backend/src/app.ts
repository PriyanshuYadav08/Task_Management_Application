// backend/src/app.ts
import express from "express";
import cors from "cors";
import helmet from "helmet";

// import your routes here (if you have them)
// import authRoutes from "./routes/auth.routes";
// import taskRoutes from "./routes/task.routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// health check
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// use routes (uncomment when you have routes)
// app.use("/api/auth", authRoutes);
// app.use("/api/tasks", taskRoutes);

export default app;