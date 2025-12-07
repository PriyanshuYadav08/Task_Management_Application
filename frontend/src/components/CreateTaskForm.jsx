import React from "react";
import { useForm } from "react-hook-form";
import api from "../api/axios";

export default function CreateTaskForm({ onCreated }) {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  async function onSubmit(data) {
    try {
      const res = await api.post("/tasks", { title: data.title, description: data.description });
      onCreated(res.data);
      reset();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to create task");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="create-form">
      <input {...register("title", { required: true })} placeholder="Task title" className="input" />
      <input {...register("description")} placeholder="Optional description" className="input" />
      <button type="submit" disabled={isSubmitting} className="btn primary">
        {isSubmitting ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}