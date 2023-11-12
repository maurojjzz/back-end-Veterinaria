import { Router } from "express";
import { sanitizePrecioInput, add, findAll, findOne, remove, update } from "./precio.controller.js";
const precioRouter = Router();
precioRouter
    .get('/', findAll)
    .get('/:id', findOne)
    .post('/', sanitizePrecioInput, add)
    .put('/:id', sanitizePrecioInput, update)
    .patch('/:id', sanitizePrecioInput, update)
    .delete('/:id', remove);
export { precioRouter };
//# sourceMappingURL=precio.routes.js.map