import express from "express";
import { usuarioRouter } from "./usuario/usuario.routes.js";
import { veterinaryRouter } from "./veterinario/veterinario.routes.js";
import { EspecieRouter } from "./especie/especie.routes.js";
import { rolRouter } from "./rol/rol.routes.js";
import { practicaRouter } from "./practica/practica.routes.js";
import { razaRouter } from "./raza/raza.routes.js";
import { mascotaRouter } from "./mascota/mascota.routes.js";
import { atencionRouter } from "./atencion/atencion.routes.js"; 
import { precioRouter } from "./precio/precio.routes.js";
import { authRouter } from "./auth/auth.routes.js";
import { pagoRouter } from "./pago/pago.routes.js";

const router = express.Router();

router
    .use('/usuarios', usuarioRouter)
    .use('/veterinarios', veterinaryRouter)
    .use('/especies', EspecieRouter)
    .use('/roles', rolRouter)
    .use('/practicas', practicaRouter)
    .use('/raza', razaRouter)
    .use('/mascotas', mascotaRouter)
    .use('/atenciones', atencionRouter)
    .use('/precios', precioRouter)
    .use('/auth', authRouter)
    .use('/pagos', pagoRouter);
    

export {router as indexRouter}