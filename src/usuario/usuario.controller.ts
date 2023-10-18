import { Request, Response, NextFunction } from "express";
import { UsuarioRepository } from "./usuario.repository.js";
import { UsuarioModel, Usuario } from "./usuario.entity.js";
import { DocumentType } from "@typegoose/typegoose";

const repository = new UsuarioRepository();


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
    res.json({data: await repository.findAll()});
};

async function findOne(req:Request, res:Response ){

    const usuario = await repository.findOne({id:req.params.id});
    if(!usuario){
        return res.status(404).json({message:'Usuario no encontrado'})
    }
    return res.json({data: usuario});
};

async function add(req:Request, res:Response){
    try {
        const userInput = req.body.sanitizedInput as DocumentType<typeof UsuarioModel>;
        const newUser = await repository.add(userInput)
        
        return res.status(201).send({
            message:'Usuario creado',
            data: newUser
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Server error',
            error: error
        })
    }
};

async function update(req:Request, res:Response){
    const user = await repository.update(req.params.id, req.body.sanitizedInput)

    if(!user){
        return res.status(404).json({
            message: "Usuario no encontrado"
        });
    }

    return res.status(200).send({
        message: 'Usuario actualizado correctamente',
        data: user
    });
};

async function remove(req:Request, res:Response){
    const id = req.params.id;
    const userDeleted= await repository.delete({id})

    if(!userDeleted){
      return res.status(404).send({message:'Usuario no encontrado'})
    }else{
        return res.status(200).send({message:'Usuario borrado exitosamente'});
    }
};

export {sanitizeUsuarioInput, findAll, findOne, add, update, remove}