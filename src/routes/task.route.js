import express from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controller/task.controller.js";

const router = express.Router();

// @route GET /api/:userId/tasks
router.get("/:userId/tasks", getAllTasks);

// @route GET /api/:userId/task/:id
router.get("/:userId/task/:id", getTaskById);

// @route POST /api/:userId/task
router.post("/:userId/task", createTask);

// @route PUT /api/:userId/task/:id
router.put("/:userId/task/:id", updateTask);

// @route DELETE /api/:userId/task/:id
router.delete("/:userId/task/:id", deleteTask);

export default router;
