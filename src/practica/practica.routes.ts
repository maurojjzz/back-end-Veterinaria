import { Router } from "express";
import { sanitizeEspecieInput, add, findAll, findOne, remove, update } from "./practica.controller.js";

const PracticaRouter = Router();

PracticaRouter
    .get('/', findAll)
    .get('/:cod', findOne)
    .post('/', sanitizeEspecieInput, add)
    .put('/:cod', sanitizeEspecieInput, update)
    .patch('/:cod', sanitizeEspecieInput, update)
    .delete('/:cod', remove);

export {PracticaRouter}