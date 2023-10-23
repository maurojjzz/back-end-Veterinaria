import { Router } from "express";
import { sanitizeEspecieInput, add, findAll, findOne, remove, update } from "./especie.controller.js";

const EspecieRouter = Router();

EspecieRouter
    .get('/', findAll)
    .get('/:id', findOne)
    .post('/', sanitizeEspecieInput, add)
    .put('/:id', sanitizeEspecieInput, update)
    .patch('/:id', sanitizeEspecieInput, update)
    .delete('/:id', remove);

export {EspecieRouter}