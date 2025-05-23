import { Veterinario } from "./veterinario.entity.js";
import { orm } from "../shared/db/orm.js";
import bcrypt from "bcrypt";
const em = orm.em;
em.getRepository(Veterinario);
function sanitizeVeterinarioInput(req, res, next) {
    req.body.sanitizedInput = {
        matricula: req.body.matricula,
        apellido: req.body.apellido,
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        email: req.body.email,
        password: req.body.password,
        nro_doc: req.body.nro_doc,
        rol: req.body.rol,
        atenciones: req.body.atenciones,
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
        const veterinarios = await em.find(Veterinario, {}, { populate: ['rol', 'atenciones'] });
        return res.status(200).json({
            message: "Veterinarios encontrados",
            data: veterinarios
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
        const veterinario = await em.findOneOrFail(Veterinario, { id }, { populate: ['rol', 'atenciones'] });
        return res.status(200).json({
            message: `Veterinario con ID ${id} encontrado`,
            data: veterinario
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
        const newVet = em.create(Veterinario, req.body.sanitizedInput);
        await em.flush();
        return res.status(201).json({
            message: 'Veterinario creado',
            data: newVet
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
        const vet = await em.findOneOrFail(Veterinario, { id });
        if (req.body.sanitizedInput.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.sanitizedInput.password, salt);
            req.body.sanitizedInput.password = hashedPassword;
        }
        em.assign(vet, req.body.sanitizedInput);
        await em.flush();
        return res.status(200).json({
            message: `Veterinario actualizado correctamente`,
            data: vet
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
        const vetToDelete = await em.getReference(Veterinario, id);
        await em.removeAndFlush(vetToDelete);
        return res.status(200).json({
            message: `Veterinario eliminado correctamente`
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
;
export { findAll, findOne, add, sanitizeVeterinarioInput, update, remove };
//# sourceMappingURL=veterinario.controller.js.map