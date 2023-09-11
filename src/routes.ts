import express from "express";
import { usuarioRouter } from "./usuario/usuario.routes.js";

const router = express.Router();

router.use('/usuarios', usuarioRouter)

export {router as indexRouter}