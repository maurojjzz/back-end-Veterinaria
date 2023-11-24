import { Router } from "express";
import { add, findAll, findOne, remove, sanitizePagoInput, update } from "./pago.controller.js";
const pagoRouter = Router();
pagoRouter
    .get('/', findAll)
    .get('/:id', findOne)
    .post('/', sanitizePagoInput, add)
    .put('/:id', sanitizePagoInput, update)
    .patch('/:id', sanitizePagoInput, update)
    .delete('/:id', remove);
export { pagoRouter };
//# sourceMappingURL=pago.routes.js.map