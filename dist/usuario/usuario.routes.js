import { Router } from "express";
import { sanitizeUsuarioInput, findAll, findOne, add, remove, update } from "./usuario.controller.js";
import { validateToken } from "../shared/middleware/auth.middleware.js";
const usuarioRouter = Router();
usuarioRouter
    .get('/', validateToken, findAll)
    .get('/:id', findOne)
    .post('/', sanitizeUsuarioInput, add)
    .put('/:id', validateToken, sanitizeUsuarioInput, update)
    .patch('/:id', validateToken, sanitizeUsuarioInput, update)
    .delete('/:id', validateToken, remove);
export { usuarioRouter };
//# sourceMappingURL=usuario.routes.js.map