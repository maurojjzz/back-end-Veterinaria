import { Router } from "express";
import { sanitizeRazaInput, add, findAll, findOne, remove, update } from "./raza.controller.js";

const razaRouter = Router();

razaRouter   
    .get('/', findAll)
    .get('/:id', findOne)
    .post('/', sanitizeRazaInput, add)
    .put('/:id', sanitizeRazaInput, update)
    .patch('/:id', sanitizeRazaInput, update)
    .delete('/:id', remove)

export {razaRouter}