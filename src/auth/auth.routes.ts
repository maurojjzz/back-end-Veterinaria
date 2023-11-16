import { Router } from "express";
import { login, auth, authProbando} from "./auth.controller.js";
import { validateToken } from "../shared/middleware/auth.middleware.js";

const authRouter = Router();

authRouter
    .post("/login", login)
    .post("/auth", authProbando)

export {authRouter}