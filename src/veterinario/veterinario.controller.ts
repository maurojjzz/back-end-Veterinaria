import { Request, Response, NextFunction } from "express";
import { VeterinarioRepository } from "./veterinario.repository.js";
import { Veterinario } from "./veterinario.entity.js";

const repository = new VeterinarioRepository();

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
    res.json({data: repository.findAll()});
};

function findOne(req:Request, res:Response ){
    const veterinario = repository.findOne({id:req.params.id});
    if(!veterinario){
        return res.status(404).json({message:'veterinario no encontrado'})
    }
    return res.json({data: veterinario});
};


function add(req:Request, res:Response){
    const {id_veterinario, matricula, apellido, nombre, direccion, telefono, email, password, tipo_doc, nro_doc, sexo} = req.body.sanitizedInput;

    const veterInput = new Veterinario(
        id_veterinario,
        matricula,
        apellido,
        nombre,
        direccion,
        telefono,
        email,
        password,
        tipo_doc,
        nro_doc,
        sexo);

    const newVeterinary = repository.add(veterInput)

    return res.status(201).send({
        message:'veterinario creado',
        data:newVeterinary
    });
};

function update(req:Request, res:Response){
    req.body.sanitizedInput.id_veterinario = req.params.id;
    const vet= repository.update(req.params.id, req.body.sanitizedInput)

    if(!vet){
        return res.status(404).json({
            message: "veterinario no encontrado"
        });
    }

    return res.status(200).send({
        message: 'veterinario actualizado correctamente',
        data: vet
    });
};

function remove(req:Request, res:Response){
    const id = req.params.id;
    const veterDeleted= repository.delete({id})

    if(!veterDeleted){
      return res.status(404).send({message:'veterinario no encontrado'})
    }else{
        return res.status(200).send({message:'veterinario borrado exitosamente'});
    }
};


export {findAll, findOne, add, sanitizeVeterinarioInput, update, remove}