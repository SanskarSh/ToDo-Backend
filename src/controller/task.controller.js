import Task from "../models/task.js";

// @desc Get all tasks
// @route GET /api/:userId/tasks
export const getAllTasks = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const tasks = await Task.find({ user_id: userId });
    res.status(200).json({
      type: "success",
      message: "Task list",
      tasks: tasks,
    });
  } catch (error) {
    res.status(500).json({ type: "failure", message: "Server error", error });
  }
};

// @desc Get single task
// @route GET /api/:userId/task/:id
export const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return res
        .status(404)
        .json({ type: "failure", message: "Task not found" });
    }

    res.status(200).json({ type: "success", message: "", task: task });
  } catch (error) {
    res.status(500).json({ type: "Failure", message: "Server error", error });
  }
};

// @desc Create task
// @route POST /api/:userId/task
export const createTask = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { title, description, complete_by } = req.body;

    const newTask = new Task({
      user_id: userId,
      title,
      description,
      complete_by,
    });

    const savedTask = await newTask.save();
    res.status(201).json({ type: "success", message: "", savedTask });
  } catch (error) {
    res.status(500).json({ type: "success", message: "Server error", error });
  }
};

// @desc Update task
// @route PUT /api/:userId/task/:id
export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, status, complete_by } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        title,
        description,
        status,
        complete_by,
      },
      { new: true }
    );

    if (!updatedTask) {
      return res
        .status(404)
        .json({ type: "failure", message: "Task not found" });
    }

    res.status(200).json({ type: "success", message: "", task: updatedTask });
  } catch (error) {
    res.status(500).json({ type: "failure", message: "Server error", error });
  }
};

// @desc Delete task
// @route DELETE /api/:userId/task/:id
export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res
        .status(404)
        .json({ type: "failure", message: "Task not found" });
    }

    res
      .status(200)
      .json({ type: "success", message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ type: "failure", message: "Server error", error });
  }
};
