import { Router } from "express";
import { sanitizeMascotaInput, add, findAll, findOne, remove, update } from "./mascota.controller.js";
const mascotaRouter = Router();
mascotaRouter
    .get('/', findAll)
    .get('/:id', findOne)
    .post('/', sanitizeMascotaInput, add)
    .put('/:id', sanitizeMascotaInput, update)
    .patch('/:id', sanitizeMascotaInput, update)
    .delete('/:id', remove);
export { mascotaRouter };
//# sourceMappingURL=mascota.routes.js.map