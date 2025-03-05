import { Usuario } from "../usuario/usuario.entity.js";
import { orm } from "../shared/db/orm.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as dotenv from "dotenv";
dotenv.config();
const em = orm.em;
em.getRepository(Usuario);
export async function sanitizeAuthInput(req, res, next) {
    req.body.sanitizedInput = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        password: req.body.password,
        telefono: req.body.telefono,
        nro_doc: req.body.nro_doc,
        direccion: req.body.direccion,
        rol: req.body.rol,
    };
    Object.keys(req.body.sanitizedInput).forEach(key => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}
export const authLogin = async (req, res) => {
    try {
        const { email, password } = req.body.sanitizedInput;
        const usuario = await em.findOneOrFail(Usuario, { email }, { populate: ['rol', 'mascotas'] });
        const contraseñaValida = await bcrypt.compare(password, usuario.password);
        if (contraseñaValida) {
            if (email === usuario.email) {
                const user = { id: usuario.id, email: email, name: `${usuario.nombre} ${usuario.apellido}`, role: usuario.rol.descripcion };
                const accessToken = generateAccessToken(user);
                res.header('authorization', accessToken).json({
                    message: "Usuario auntenticado",
                    token: accessToken,
                    role: usuario.rol.descripcion
                });
            }
            else {
                res.status(401).json({ error: "Credenciales incorrectas" });
            }
        }
        else {
            res.status(401).json({ error: "Contraseña incorrecta" });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const SignUp = async (req, res) => {
    try {
        const { email, nro_doc, telefono, password } = req.body.sanitizedInput;
        const existingUser = await em.findOne(Usuario, {
            $or: [{ email }, { nro_doc }, { telefono }]
        });
        if (existingUser) {
            if (existingUser.email === email)
                throw new Error("El email ya está registrado.");
            if (existingUser.nro_doc === nro_doc)
                throw new Error("El número de documento ya está registrado.");
            if (existingUser.telefono === telefono)
                throw new Error("El teléfono ya está registrado.");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = em.create(Usuario, { ...req.body.sanitizedInput, password: hashedPassword, rol: process.env.USER_TYPE_ID });
        await em.flush();
        res.status(201).json({
            message: "Usuario creado con exito"
        });
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20m' });
};
//# sourceMappingURL=auth.controller.js.map