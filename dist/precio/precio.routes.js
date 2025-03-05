import { Router } from "express";
import { sanitizePrecioInput, add, findAll, findOne, remove, update } from "./precio.controller.js";
import { validateToken } from "../shared/middleware/auth.middleware.js";
const precioRouter = Router();
precioRouter
    .get('/', validateToken, findAll)
    .get('/:id', findOne)
    .post('/', validateToken, sanitizePrecioInput, add)
    .put('/:id', validateToken, sanitizePrecioInput, update)
    .patch('/:id', validateToken, sanitizePrecioInput, update)
    .delete('/:id', validateToken, remove);
export { precioRouter };
//# sourceMappingURL=precio.routes.js.map