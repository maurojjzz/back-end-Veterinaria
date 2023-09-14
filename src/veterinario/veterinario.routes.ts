import { Router } from "express";
import { add, findAll, findOne,remove,sanitizeVeterinarioInput,update } from "./veterinario.controller.js";

const veterinaryRouter = Router();

veterinaryRouter
    .get('/', findAll)
    .get('/:id', findOne)
    .post('/',sanitizeVeterinarioInput,add)
    .put('/:id', sanitizeVeterinarioInput, update)
    .patch('/:id', sanitizeVeterinarioInput, update)
    .delete('/:id',remove)

export {veterinaryRouter}