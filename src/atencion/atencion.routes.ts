import { Router } from "express";
import { add, findAll, findOne,remove,sanitizeAtencionInput,update } from "./atencion.controller.js";

const atencionRouter = Router();

atencionRouter
    .get('/', findAll)
    .get('/:id', findOne)
    .post('/',sanitizeAtencionInput,add)
    .put('/:id', sanitizeAtencionInput, update)
    .patch('/:id', sanitizeAtencionInput, update)
    .delete('/:id',remove)

export {atencionRouter}