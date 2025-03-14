import { Router } from "express";
import { add, findAll, findOne, remove, sanitizeVeterinarioInput, update } from "./veterinario.controller.js";
import { validateToken } from "../shared/middleware/auth.middleware.js";
const veterinaryRouter = Router();
veterinaryRouter
    .get('/', findAll)
    .get('/:id', findOne)
    .post('/', validateToken, sanitizeVeterinarioInput, add)
    .put('/:id', validateToken, sanitizeVeterinarioInput, update)
    .patch('/:id', validateToken, sanitizeVeterinarioInput, update)
    .delete('/:id', validateToken, remove);
export { veterinaryRouter };
//# sourceMappingURL=veterinario.routes.js.map