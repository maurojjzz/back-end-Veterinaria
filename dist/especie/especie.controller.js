import { Especie } from "./especie.entity.js";
import { orm } from "../shared/db/orm.js";
const em = orm.em;
em.getRepository(Especie);
function sanitizeEspecieInput(req, res, next) {
    req.body.sanitizedInput = {
        descripcion: req.body.descripcion
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
        const especies = await em.find(Especie, {}, { populate: ['razas'] });
        res.status(200).json({
            message: 'Especies encontradas',
            data: especies
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
        const especie = await em.findOneOrFail(Especie, { id }, { populate: ['razas'] });
        res.status(200).json({
            message: 'Especie encontrada',
            data: especie
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
        const newEspecie = em.create(Especie, req.body.sanitizedInput);
        await em.flush();
        return res.status(201).json({
            message: 'Especie creada',
            data: newEspecie
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
        const especie = await em.findOneOrFail(Especie, { id });
        em.assign(especie, req.body.sanitizedInput);
        await em.flush();
        res.status(200).send({
            message: 'Especie actualizada correctamente',
            data: especie
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
        const especieToDelete = await em.getReference(Especie, id);
        em.removeAndFlush(especieToDelete);
        res.status(200).json({
            message: 'Especie eliminada correctamente'
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
;
export { findAll, findOne, add, sanitizeEspecieInput, update, remove };
//# sourceMappingURL=especie.controller.js.map