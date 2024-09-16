import { Router } from "express";
import { login } from "../controller/auth.controller.js";

const router = Router();

// Login/Sign up user
router.post("/login", login);

export default router;
