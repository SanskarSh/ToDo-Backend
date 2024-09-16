import mongoose from "mongoose";
import taskSchema from "./task.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "tasks" }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

export default User;
