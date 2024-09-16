import express from "express";
import mongoose from "mongoose";
import { PORT, MONGODB_URI } from "./config.js";
import authRouter from "./routes/auth.route.js";
import tasksRouter from "./routes/task.route.js";
import logger from "./middleware/logger.middleware.js";

const app = express();

// ----------------------- Middleware ---------------------------- //

/// Logger
app.use(logger);

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies (for form data, if needed)
app.use(express.urlencoded({ extended: true }));

// ------------------------- routes ------------------------------ //
app.use("/ping", (req, res) => {
  res.status(200).json({
    type: "success",
    message: "Pong 🏓",
  });
});

app.use("/api/auth", authRouter);

app.use("/api", tasksRouter);

// ----------------------- Error Handling ------------------------ //
// Add error-handling middleware at the end
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ type: "failure", message: "Internal Server Error" });
});

async function main() {
  try {
    await mongoose
      .connect(MONGODB_URI)
      .then(() => {
        console.log("MongoDB Connected ✅");
      })
      .catch((err) => {
        console.log(`Failed to connect to MongoDB: ${err}`);
      });

    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT} 🚀`)
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
