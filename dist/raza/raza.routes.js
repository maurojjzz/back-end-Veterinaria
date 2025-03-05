import { Router } from "express";
import { sanitizeRazaInput, add, findAll, findOne, remove, update } from "./raza.controller.js";
import { validateToken } from "../shared/middleware/auth.middleware.js";
const razaRouter = Router();
razaRouter
    .get('/', findAll)
    .get('/:id', findOne)
    .post('/', validateToken, sanitizeRazaInput, add)
    .put('/:id', validateToken, sanitizeRazaInput, update)
    .patch('/:id', validateToken, sanitizeRazaInput, update)
    .delete('/:id', validateToken, remove);
export { razaRouter };
//# sourceMappingURL=raza.routes.js.map