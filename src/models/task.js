import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "done"],
    default: "pending",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  complete_by: {
    type: Date,
    required: true,
  },
});

const Task = mongoose.model("tasks", taskSchema);

export default Task;
