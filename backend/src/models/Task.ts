import { Schema, model, Document, Types } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  status: "pending" | "completed";
  owner: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export const Task = model<ITask>("Task", TaskSchema);