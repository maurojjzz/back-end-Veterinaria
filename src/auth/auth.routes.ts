import { Router } from "express";
import { authLogin, SignUp, sanitizeAuthInput } from "./auth.controller.js";

const authRouter = Router();

authRouter
    .post("/login", sanitizeAuthInput, authLogin)
    .post("/signup", sanitizeAuthInput, SignUp)

export {authRouter}