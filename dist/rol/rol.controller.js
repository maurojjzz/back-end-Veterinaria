import { Rol } from "./rol.entity.js";
import { orm } from "../shared/db/orm.js";
const em = orm.em;
em.getRepository(Rol);
async function sanitizeRolInput(req, res, next) {
    req.body.sanitizedInput = {
        descripcion: req.body.descripcion,
        usuarios: req.body.usuarios,
        veterinarios: req.body.veterinarios,
        isActive: req.body.isActive,
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
        const roles = await em.find(Rol, {});
        res.status(200).json({
            message: 'Roles encontrados',
            data: roles
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
        const rol = await em.findOneOrFail(Rol, { id }, { populate: ['usuarios', 'veterinarios'] });
        const filteredRol = {
            ...rol,
            usuarios: rol.usuarios.length > 0 ? rol.usuarios : undefined,
            veterinarios: rol.veterinarios.length > 0 ? rol.veterinarios : undefined,
        };
        res.status(200).json({
            message: 'Rol encontrado',
            data: filteredRol
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
        const newRol = em.create(Rol, req.body.sanitizedInput);
        await em.flush();
        return res.status(201).json({
            message: 'Rol creado',
            data: newRol
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
        const rol = await em.findOneOrFail(Rol, { id });
        em.assign(rol, req.body.sanitizedInput);
        await em.flush();
        res.status(200).send({
            message: 'Rol actualizado correctamente',
            data: rol
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
        const rolToDelete = await em.getReference(Rol, id);
        em.removeAndFlush(rolToDelete);
        res.status(200).json({
            message: 'Rol eliminado correctamente'
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
;
export { sanitizeRolInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=rol.controller.js.map