import { Practica } from "./practica.entity.js";
import { orm } from "../shared/db/orm.js";
const em = orm.em;
em.getRepository(Practica);
function sanitizePrecioInput(req, res, next) {
    req.body.sanitizedInput = {
        descripcion: req.body.descripcion,
        atenciones: req.body.atenciones,
        precios: req.body.precios,
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
        const practica = await em.find(Practica, {}, { populate: ['atenciones', 'precios'] });
        res.status(200).json({
            message: 'Practicas encontradas',
            data: practica
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
            data: {}
        });
    }
}
;
async function findOne(req, res) {
    try {
        const id = req.params.id;
        const practica = await em.findOneOrFail(Practica, { id }, { populate: ['atenciones', 'precios'] });
        res.status(200).json({
            message: 'Práctica encontrada',
            data: practica
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
        const newPractica = em.create(Practica, req.body.sanitizedInput);
        await em.flush();
        return res.status(201).json({
            message: 'Práctica creada',
            data: newPractica
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
        const practica = await em.findOneOrFail(Practica, { id });
        em.assign(practica, req.body.sanitizedInput);
        await em.flush();
        res.status(200).send({
            message: 'Práctica actualizada correctamente',
            data: practica
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
        const practicaToDelete = await em.getReference(Practica, id);
        em.removeAndFlush(practicaToDelete);
        res.status(200).json({
            message: 'Practica eliminada correctamente'
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
;
export { findAll, findOne, add, sanitizePrecioInput, update, remove };
//# sourceMappingURL=practica.controller.js.map