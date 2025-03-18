import { Request, Response, NextFunction } from "express";
import { Atencion } from "./atencion.entity.js";
import { orm } from "../shared/db/orm.js";

const em= orm.em;
em.getRepository(Atencion);

async function sanitizeAtencionInput(req:Request, res:Response, next:NextFunction){
    req.body.sanitizedInput = {         
        fecha_hora_atencion: req.body.fecha_hora_atencion,
        forma_de_pago: req.body.forma_de_pago,
        importe: req.body.importe, 
        veterinario: req.body.veterinario,
        mascota: req.body.mascota,
        practicas: req.body.practicas,
        pagos:req.body.pagos,
        isActive: req.body.isActive,
    }
    Object.keys(req.body.sanitizedInput).forEach(key => {
        if(req.body.sanitizedInput[key] === undefined){
            delete req.body.sanitizedInput[key]
        }
    } )
    next();
}

async function findAll(req:Request, res:Response){
    try {
        const atenciones = await em.find(Atencion, {}, {populate:['veterinario', 'mascota', 'practicas', 'pagos']})
        res.status(200).json({
            message: 'Atenciones encontradas',
            data:atenciones
        });
    } catch (error:any) {
        res.status(500).json({
            message:error.message
        })
    }
};

async function findOne(req:Request, res:Response ){
    try {
        const id = req.params.id;
        const atencion = await em.findOneOrFail(Atencion, {id}, {populate:['veterinario', 'mascota', 'practicas', 'pagos']});
        res.status(200).json({
            message:'Atencion encontrada',
            data:atencion
        })
    } catch (error:any) {
        res.status(500).json({
            message: error.message
        })
    }
};

async function add(req:Request, res:Response){
    try {
        const newAtte = em.create(Atencion, req.body.sanitizedInput)
        await em.flush();
        return res.status(201).json({
            message:'Atencion creada',
            data: newAtte
        });
    } catch (error:any) {
        res.status(500).json({
            message: error.message
        })
    }
};

async function update(req:Request, res:Response){
    try {
        const id = req.params.id;
        const atencion = await em.findOneOrFail(Atencion, {id})
        em.assign(atencion, req.body.sanitizedInput)
        await em.flush();
        res.status(200).send({
            message: 'Atencion actualizada correctamente',
            data: atencion
        });
    } catch (error:any) {
        res.status(500).json({
            message: error.message
        })
    }
};

async function remove(req:Request, res:Response){
    try {
        const id = req.params.id;
        const atencionToDelete = await em.getReference(Atencion, id);
        em.removeAndFlush(atencionToDelete)
        res.status(200).json({
            message: 'Atencion eliminada correctamente'
        })
    } catch (error:any) {
        res.status(500).json({
            message: error.message
        })
    }
};

export {sanitizeAtencionInput, findAll, findOne, add, update, remove}