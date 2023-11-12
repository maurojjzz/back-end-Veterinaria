import { Atencion } from "./atencion.entity.js";
import { orm } from "../shared/db/orm.js";
const em = orm.em;
em.getRepository(Atencion);
async function sanitizeAtencionInput(req, res, next) {
    req.body.sanitizedInput = {
        fecha_hora_atencion: req.body.fecha_hora_atencion,
        forma_de_pago: req.body.forma_de_pago,
        importe: req.body.importe,
        veterinario: req.body.veterinario,
        mascota: req.body.mascota,
        practicas: req.body.practicas
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
        const atenciones = await em.find(Atencion, {}, { populate: ['veterinario', 'mascota', 'practicas'] });
        res.status(200).json({
            message: 'Atenciones encontradas',
            data: atenciones
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
        const atencion = await em.findOneOrFail(Atencion, { id }, { populate: ['veterinario', 'mascota', 'practicas'] });
        res.status(200).json({
            message: 'Atencion encontrada',
            data: atencion
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
        const newAtte = em.create(Atencion, req.body.sanitizedInput);
        await em.flush();
        return res.status(201).json({
            message: 'Atencion creada',
            data: newAtte
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
        const atencion = await em.findOneOrFail(Atencion, { id });
        em.assign(atencion, req.body.sanitizedInput);
        await em.flush();
        res.status(200).send({
            message: 'Atencion actualizada correctamente',
            data: atencion
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
        const atencionToDelete = await em.getReference(Atencion, id);
        em.removeAndFlush(atencionToDelete);
        res.status(200).json({
            message: 'Atencion eliminada correctamente'
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
;
export { sanitizeAtencionInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=atencion.controller.js.map