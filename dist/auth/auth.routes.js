import { Router } from "express";
import { authLogin } from "./auth.controller.js";
const authRouter = Router();
authRouter
    .post("/login", authLogin);
export { authRouter };
//# sourceMappingURL=auth.routes.js.map