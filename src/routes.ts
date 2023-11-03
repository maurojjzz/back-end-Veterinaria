import express from "express";
import { usuarioRouter } from "./usuario/usuario.routes.js";
import { veterinaryRouter } from "./veterinario/veterinario.routes.js";
import { EspecieRouter } from "./especie/especie.routes.js";
import { rolRouter } from "./rol/rol.routes.js";
import { practicaRouter } from "./practica/practica.routes.js";
import { razaRouter } from "./raza/raza.routes.js";

const router = express.Router();

router
    .use('/usuarios', usuarioRouter)
    .use('/veterinarios', veterinaryRouter)
    .use('/especies', EspecieRouter)
    .use('/roles', rolRouter)
    .use('/practicas', practicaRouter)
    .use('/raza', razaRouter);
    

export {router as indexRouter}