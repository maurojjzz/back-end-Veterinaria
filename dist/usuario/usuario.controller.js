import { Usuario } from "./usuario.entity.js";
import { orm } from "../shared/db/orm.js";
import bcrypt from "bcrypt";
const em = orm.em;
em.getRepository(Usuario);
async function sanitizeUsuarioInput(req, res, next) {
    req.body.sanitizedInput = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        password: req.body.password,
        telefono: req.body.telefono,
        nro_doc: req.body.nro_doc,
        direccion: req.body.direccion,
        rol: req.body.rol,
        mascotas: req.body.mascotas
    };
    Object.keys(req.body.sanitizedInput).forEach(key => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}
async function findAll(req, res) {
    try {
        const usuarios = await em.find(Usuario, {}, { populate: ['rol', 'mascotas'] });
        res.status(200).json({
            message: 'Usuarios encontrados',
            data: usuarios
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
;
async function findOne(req, res) {
    try {
        const id = req.params.id;
        const usuario = await em.findOneOrFail(Usuario, { id }, { populate: ['rol', 'mascotas'] });
        res.status(200).json({
            message: 'Usuario encontrado',
            data: usuario
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
;
async function add(req, res) {
    try {
        const { password } = req.body.sanitizedInput;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.sanitizedInput.password = hashedPassword;
        const newUser = em.create(Usuario, req.body.sanitizedInput);
        await em.flush();
        return res.status(201).json({
            message: 'Usuario creado',
            data: newUser
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
;
async function update(req, res) {
    try {
        const id = req.params.id;
        const user = await em.findOneOrFail(Usuario, { id });
        if (req.body.sanitizedInput.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.sanitizedInput.password, salt);
            req.body.sanitizedInput.password = hashedPassword;
        }
        em.assign(user, req.body.sanitizedInput);
        await em.flush();
        res.status(200).send({
            message: 'Usuario actualizado correctamente',
            data: user
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
;
async function remove(req, res) {
    try {
        const id = req.params.id;
        const userToDelete = await em.getReference(Usuario, id);
        em.removeAndFlush(userToDelete);
        res.status(200).json({
            message: 'Usuario eliminado correctamente'
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
;
export { sanitizeUsuarioInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=usuario.controller.js.map