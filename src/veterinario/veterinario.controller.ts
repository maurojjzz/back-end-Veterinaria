import { Request, Response, NextFunction } from "express";
import { Veterinario } from "./veterinario.entity.js";


function sanitizeVeterinarioInput(req:Request, res:Response, next:NextFunction){
    req.body.sanitizedInput = {
        id_veterinario: req.body.id_veterinario,
        matricula: req.body.matricula,
        apellido: req.body.apellido,
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        email: req.body.email, 
        password: req.body.password,
        tipo_doc: req.body.tipo_doc,
        nro_doc: req.body.nro_doc,
        sexo: req.body.sexo,
    }
    Object.keys(req.body.sanitizedInput).forEach(key => {
        if(req.body.sanitizedInput[key] === undefined){
            delete req.body.sanitizedInput[key]
        }
    } )
    next();
}

function findAll(req:Request, res:Response){
    res.status(500).send("No implementado")
};

function findOne(req:Request, res:Response ){
    res.status(500).send("No implementado")
};


function add(req:Request, res:Response){
    res.status(500).send("No implementado")
};

function update(req:Request, res:Response){
    res.status(500).send("No implementado")
};

function remove(req:Request, res:Response){
    res.status(500).send("No implementado")
};


export {findAll, findOne, add, sanitizeVeterinarioInput, update, remove}