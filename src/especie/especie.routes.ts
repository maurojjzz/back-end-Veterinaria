import { Router } from "express";
import { sanitizeEspecieInput, add, findAll, findOne, remove, update } from "./especie.controller.js";
import { validateToken } from "../shared/middleware/auth.middleware.js";


const EspecieRouter = Router();

EspecieRouter
    .get('/', validateToken, findAll)
    .get('/:id', findOne)
    .post('/', validateToken, sanitizeEspecieInput, add)
    .put('/:id', validateToken, sanitizeEspecieInput, update)
    .patch('/:id', validateToken, sanitizeEspecieInput, update)
    .delete('/:id', validateToken, remove);

export { EspecieRouter }