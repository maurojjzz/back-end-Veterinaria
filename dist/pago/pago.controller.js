import { Pago } from "./pago.entity.js";
import { orm } from "../shared/db/orm.js";
const em = orm.em;
em.getRepository(Pago);
async function sanitizePagoInput(req, res, next) {
    req.body.sanitizedInput = {
        importe: req.body.importe,
        forma_de_pago: req.body.forma_de_pago,
        cuotas: req.body.cuotas,
        nro_cuota: req.body.nro_cuota,
        fecha_hora_pago: req.body.fecha_hora_pago,
        atencion: req.body.atencion,
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
        const pagos = await em.find(Pago, {}, { populate: ['atencion'] });
        res.status(200).json({
            message: 'Pagos encontrados',
            data: pagos
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
        const pago = await em.findOneOrFail(Pago, { id }, { populate: ['atencion'] });
        res.status(200).json({
            message: 'Pago encontrado',
            data: pago
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
        const newPago = em.create(Pago, req.body.sanitizedInput);
        await em.flush();
        return res.status(201).json({
            message: 'Pago creado',
            data: newPago
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
        const pago = await em.findOneOrFail(Pago, { id });
        em.assign(pago, req.body.sanitizedInput);
        await em.flush();
        res.status(200).send({
            message: 'Pago actualizado correctamente',
            data: pago
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
        const pagoToDelete = await em.getReference(Pago, id);
        em.removeAndFlush(pagoToDelete);
        res.status(200).json({
            message: 'Pago eliminado correctamente'
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
;
export { sanitizePagoInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=pago.controller.js.map