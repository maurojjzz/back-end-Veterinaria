import express from "express";
import { usuarioRouter } from "./usuario/usuario.routes.js";
import { veterinaryRouter } from "./veterinario/veterinario.routes.js";
import { EspecieRouter } from "./especie/especie.routes.js";

const router = express.Router();

router
    .use('/usuarios', usuarioRouter)
    .use('/veterinarios', veterinaryRouter)
    .use('/especies', EspecieRouter)


export {router as indexRouter}