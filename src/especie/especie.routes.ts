import { Router } from "express";
import { sanitizeEspecieInput, add, findAll, findOne, remove, update } from "./especie.controller.js";

const EspecieRouter = Router();

EspecieRouter
    .get('/', findAll)
    .get('/:cod', findOne)
    .post('/', sanitizeEspecieInput, add)
    .put('/:cod', sanitizeEspecieInput, update)
    .patch('/:cod', sanitizeEspecieInput, update)
    .delete('/:cod', remove);

export {EspecieRouter}