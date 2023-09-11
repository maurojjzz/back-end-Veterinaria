import { Request, Response, NextFunction } from "express";
import { UsuarioRepository } from "./usuario.repository.js";
import { Usuario } from "./usuario.entity.js";

const repository = new UsuarioRepository();

function sanitizeUsuarioInput(req:Request, res:Response, next:NextFunction){
    req.body.sanitizedInput = {
        id_usuario: req.body.id_usuario,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email, 
        password: req.body.password,
        telefono: req.body.telefono,
        tipo_doc: req.body.tipo_doc,
        nro_doc: req.body.nro_doc,
        direccion: req.body.direccion,
        sexo: req.body.sexo,
        user: req.body.user
    }
    Object.keys(req.body.sanitizedInput).forEach(key => {
        if(req.body.sanitizedInput[key] === undefined){
            delete req.body.sanitizedInput[key]
        }
    } )
    next();
}

function findAll(req:Request, res:Response){
    res.json({data: repository.findAll()});
};

function findOne(req:Request, res:Response ){
    const usuario = repository.findOne({id:req.params.id});
    if(!usuario){
        return res.status(404).json({message:'Usuario no encontrado'})
    }
    return res.json({data: usuario});
};

function add(req:Request, res:Response){
    const {id_usuario, nombre, apellido, email, password, telefono, tipo_doc, nro_doc, direccion, sexo, user} = req.body.sanitizedInput;

    const userInput = new Usuario(
        id_usuario,
        nombre,
        apellido,
        email, 
        password,
        telefono,
        tipo_doc,
        nro_doc,
        direccion,
        sexo,
        user);

    const userNew = repository.add(userInput)

    return res.status(201).send({
        message:'Usuario creado',
        data:userNew
    });
};

function update(req:Request, res:Response){
    req.body.sanitizedInput.id_usuario = req.params.id;
    const user= repository.update(req.body.sanitizedInput)

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

function remove(req:Request, res:Response){
    const id = req.params.id;
    const userDeleted= repository.delete({id})

    if(!userDeleted){
      return res.status(404).send({message:'Usuario no encontrado'})
    }else{
        return res.status(200).send({message:'Usuario borrado exitosamente'});
    }
};






export {sanitizeUsuarioInput, findAll, findOne, add, update, remove}