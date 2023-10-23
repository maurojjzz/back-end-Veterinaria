import { Router } from "express";
import { sanitizeEspecieInput, add, findAll, findOne, remove, update } from "./practica.controller.js";

const practicaRouter = Router();

practicaRouter
    .get('/', findAll)
    .get('/:id', findOne)
    .post('/', sanitizeEspecieInput, add)
    .put('/:id', sanitizeEspecieInput, update)
    .patch('/:id', sanitizeEspecieInput, update)
    .delete('/:id', remove);

export {practicaRouter}