import { Router } from "express";
import { add, findAll, findOne, remove, sanitizeAtencionInput, update } from "./atencion.controller.js";
import { validateToken } from "../shared/middleware/auth.middleware.js";
const atencionRouter = Router();
atencionRouter
    .get('/', findAll)
    .get('/:id', findOne)
    .post('/', validateToken, sanitizeAtencionInput, add)
    .put('/:id', validateToken, sanitizeAtencionInput, update)
    .patch('/:id', validateToken, sanitizeAtencionInput, update)
    .delete('/:id', validateToken, remove);
export { atencionRouter };
//# sourceMappingURL=atencion.routes.js.map