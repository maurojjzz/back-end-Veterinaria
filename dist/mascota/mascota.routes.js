import { Router } from "express";
import { sanitizeMascotaInput, add, findAll, findOne, remove, update } from "./mascota.controller.js";
import { validateToken } from "../shared/middleware/auth.middleware.js";
const mascotaRouter = Router();
mascotaRouter
    .get('/', validateToken, findAll)
    .get('/:id', findOne)
    .post('/', validateToken, sanitizeMascotaInput, add)
    .put('/:id', validateToken, sanitizeMascotaInput, update)
    .patch('/:id', validateToken, sanitizeMascotaInput, update)
    .delete('/:id', validateToken, remove);
export { mascotaRouter };
//# sourceMappingURL=mascota.routes.js.map