import { Request, Response, NextFunction } from "express";
import { Mascota } from "./mascota.entity.js";
import { orm } from "../shared/db/orm.js";

const em= orm.em;
em.getRepository(Mascota);

async function sanitizeMascotaInput(req:Request, res:Response, next:NextFunction){
    req.body.sanitizedInput = {         
        nombre: req.body.nombre,
        sexo: req.body.sexo,
        fecha_nacimiento: req.body.fecha_nacimiento,
        owner: req.body.owner,
        raza: req.body.raza,
        atenciones: req.body.atenciones
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
        const usuarios = await em.find(Mascota, {}, {populate:['owner', 'raza', 'atenciones']})
        res.status(200).json({
            message: 'Mascotas encontradas',
            data:usuarios
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
        const usuario = await em.findOneOrFail(Mascota, {id}, {populate:['owner', 'raza', 'atenciones']});
        res.status(200).json({
            message:'Mascota encontrada',
            data:usuario
        })
    } catch (error:any) {
        res.status(500).json({
            message: error.message
        })
    }
};

async function add(req:Request, res:Response){
    try {
        const newUser = em.create(Mascota, req.body.sanitizedInput)
        await em.flush();
        return res.status(201).json({
            message:'Mascota creada',
            data: newUser
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
        const mascota = await em.findOneOrFail(Mascota, {id})
        em.assign(mascota, req.body.sanitizedInput)
        await em.flush();
        res.status(200).send({
            message: 'Mascota actualizado correctamente',
            data: mascota
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
        const mascotaToDelete = await em.getReference(Mascota, id);
        em.removeAndFlush(mascotaToDelete)
        res.status(200).json({
            message: 'Mascota eliminada correctamente'
        })
    } catch (error:any) {
        res.status(500).json({
            message: error.message
        })
    }
};

export {sanitizeMascotaInput, findAll, findOne, add, update, remove}