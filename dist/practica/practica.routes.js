import { Router } from "express";
import { sanitizePrecioInput, add, findAll, findOne, remove, update } from "./practica.controller.js";
import { validateToken } from "../shared/middleware/auth.middleware.js";
const practicaRouter = Router();
practicaRouter
    .get('/', validateToken, findAll)
    .get('/:id', findOne)
    .post('/', validateToken, sanitizePrecioInput, add)
    .put('/:id', validateToken, sanitizePrecioInput, update)
    .patch('/:id', validateToken, sanitizePrecioInput, update)
    .delete('/:id', validateToken, remove);
export { practicaRouter };
//# sourceMappingURL=practica.routes.js.map