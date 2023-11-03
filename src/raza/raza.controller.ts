import { Request, Response, NextFunction } from "express";
import { Raza } from "./raza.entity.js";
import { orm } from "../shared/db/orm.js";

const em= orm.em;
em.getRepository(Raza);

async function sanitizeRazaInput(req:Request, res:Response, next:NextFunction){
    req.body.sanitizedInput = {         
        descripcion: req.body.descripcion,
        especie: req.body.especie,
        mascotas: req.body.mascota
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
        const raza = await em.find(Raza, {},{populate:['especie', 'mascotas']})
        res.status(200).json({
            message: 'Razas encontradas',
            data:raza
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
        const raza = await em.findOneOrFail(Raza, {id},{populate:['especie', 'mascotas']});
        res.status(200).json({
            message:'Raza encontrada',
            data:raza
        })
    } catch (error:any) {
        res.status(500).json({
            message: error.message
        })
    }
};

async function add(req:Request, res:Response){
    try {
        const newRaza = em.create(Raza, req.body.sanitizedInput)
        await em.flush();
        return res.status(201).json({
            message:'Raza creada',
            data: newRaza
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
        const raza = await em.findOneOrFail(Raza, {id})
        em.assign(raza, req.body.sanitizedInput)
        await em.flush();
        res.status(200).send({
            message: 'Raza actualizada correctamente',
            data: raza
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
        const razaToDelete = await em.getReference(Raza, id);
        em.removeAndFlush(razaToDelete)
        res.status(200).json({
            message: 'raza eliminada correctamente'
        })
    } catch (error:any) {
        res.status(500).json({
            message: error.message
        })
    }
};

export {sanitizeRazaInput, findAll, findOne, add, update, remove}