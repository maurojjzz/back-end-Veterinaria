import { Router } from "express";
import { sanitizePrecioInput, add, findAll, findOne, remove, update } from "./practica.controller.js";
const practicaRouter = Router();
practicaRouter
    .get('/', findAll)
    .get('/:id', findOne)
    .post('/', sanitizePrecioInput, add)
    .put('/:id', sanitizePrecioInput, update)
    .patch('/:id', sanitizePrecioInput, update)
    .delete('/:id', remove);
export { practicaRouter };
//# sourceMappingURL=practica.routes.js.map