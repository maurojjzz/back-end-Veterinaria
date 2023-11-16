import { Router } from "express";
import { login, authProbando } from "./auth.controller.js";
const authRouter = Router();
authRouter
    .post("/login", login)
    .post("/auth", authProbando);
export { authRouter };
//# sourceMappingURL=auth.routes.js.map