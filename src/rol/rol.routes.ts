import { Router } from "express";
import { sanitizeRolInput, add, findAll, findOne, remove, update } from "./rol.controller.js";

const rolRouter = Router();

rolRouter   
    .get('/', findAll)
    .get('/:id', findOne)
    .post('/', sanitizeRolInput, add)
    .put('/:id', sanitizeRolInput, update)
    .patch('/:id', sanitizeRolInput, update)
    .delete('/:id', remove)

export {rolRouter}