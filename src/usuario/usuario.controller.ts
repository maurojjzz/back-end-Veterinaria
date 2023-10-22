import { Request, Response, NextFunction } from "express";
import { Usuario } from "./usuario.entity.js";
import { orm } from "../shared/db/orm.js";

const em= orm.em;
em.getRepository(Usuario);

async function sanitizeUsuarioInput(req:Request, res:Response, next:NextFunction){
    req.body.sanitizedInput = {         
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email, 
        password: req.body.password,
        telefono: req.body.telefono,
        nro_doc: req.body.nro_doc,
        direccion: req.body.direccion,
        rol: req.body.rol,
        mascotas: req.body.mascotas
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
        const usuarios = await em.find(Usuario, {}, {populate:['rol', 'mascotas']})
        res.status(200).json({
            message: 'Usuarios encontrados',
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
        const usuario = await em.findOneOrFail(Usuario, {id}, {populate:['rol', 'mascotas']});
        res.status(200).json({
            message:'Usuario encontrado',
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
        const newUser = em.create(Usuario, req.body.sanitizedInput)
        await em.flush();
        return res.status(201).json({
            message:'Usuario creado',
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
        const user = await em.findOneOrFail(Usuario, {id})
        em.assign(user, req.body.sanitizedInput)
        await em.flush();
        res.status(200).send({
            message: 'Usuario actualizado correctamente',
            data: user
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
        const userToDelete = await em.getReference(Usuario, id);
        em.removeAndFlush(userToDelete)
        res.status(200).json({
            message: 'Usuario eliminado correctamente'
        })
    } catch (error:any) {
        res.status(500).json({
            message: error.message
        })
    }
};

export {sanitizeUsuarioInput, findAll, findOne, add, update, remove}