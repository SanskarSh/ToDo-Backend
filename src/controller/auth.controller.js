import User from "../models/user.js";
import bcrypt from "bcrypt";

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Check if any fields are missing
    if (!username || !password) {
      return res
        .status(400)
        .json({ type: "failure", message: "All fields are required." });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      // Compare the password
      const isMatch = await bcrypt.compare(password, existingUser.password);

      if (isMatch) {
        return res.status(200).json({
          type: "success",
          message: "Login successful",
          _id: existingUser._id,
          username: existingUser.username,
          tasks: existingUser.tasks,
        });
      } else {
        return res.status(400).json({
          type: "failure",
          message: "Invalid password.",
        });
      }
    }

    // If user does not exist, create a new one
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    // Send success response
    return res.status(201).json({
      type: "success",
      message: "User created successfully.",
      _id: existingUser._id,
      username: existingUser.username,
      tasks: existingUser.tasks,
    });
  } catch (error) {
    console.error("Error during login or user creation:", error);

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        type: "failure",
        message: "Username already exists.",
      });
    }

    return res.status(500).json({
      type: "failure",
      message: "An error occurred while processing your request.",
    });
  }
};
