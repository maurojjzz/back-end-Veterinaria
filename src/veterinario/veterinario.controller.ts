import { Request, Response, NextFunction } from "express";
import { Veterinario } from "./veterinario.entity.js";
import { orm } from "../shared/db/orm.js";

const em = orm.em;
em.getRepository(Veterinario);

function sanitizeVeterinarioInput(req:Request, res:Response, next:NextFunction){
    req.body.sanitizedInput = {
        matricula: req.body.matricula,
        apellido: req.body.apellido,
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        email: req.body.email, 
        password: req.body.password,
        nro_doc: req.body.nro_doc,
        rol: req.body.rol
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
        const veterinarios = await em.find(Veterinario, {}, {populate:['rol']})
        return res.status(200).json({
            message:"Veterinarios encontrados",
            data: veterinarios
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
        const veterinario = await em.findOneOrFail(Veterinario, {id}, {populate:['rol']})
        return res.status(200).json({
            message:`Veterinario con ID ${id} encontrado`,
            data: veterinario
        })
    } catch (error:any) {
        res.status(500).json({
            message:error.message
        })
    }
};


async function add(req:Request, res:Response){
    try {
        const newVet = em.create(Veterinario, req.body.sanitizedInput);
        await em.flush();
        return res.status(201).json({
            message:'Veterinario creado',
            data:newVet
        })
    } catch (error:any) {
        res.status(500).json({
            message:error.message
        })
    }
};

async function update(req:Request, res:Response){
    try {
        const id = req.params.id;
        const vet = await em.findOneOrFail(Veterinario, {id});
        em.assign(vet, req.body.sanitizedInput);
        await em.flush();
        return res.status(200).json({
            message:`Veterinario actualizado correctamente`,
            data:vet
        })
    } catch (error:any) {
        res.status(500).json({
            message:error.message
        })
    }
};

async function remove(req:Request, res:Response){
    try {
        const id = req.params.id;
        const vetToDelete = await em.getReference(Veterinario, id)
        await em.removeAndFlush(vetToDelete)
        return res.status(200).json({
            message:`Veterinario eliminado correctamente`
        })
    } catch (error:any) {
        res.status(500).json({
            message:error.message
        })
    }
};


export {findAll, findOne, add, sanitizeVeterinarioInput, update, remove}