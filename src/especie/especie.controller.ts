import { Request, Response, NextFunction } from "express";
import { EspecieRepository } from "./especie.repository.js";
import { Especie } from "./especie.entity.js";

const repository = new EspecieRepository();


function sanitizeEspecieInput(req:Request, res:Response, next:NextFunction){
    req.body.sanitizedInput = {
        cod_especie: req.body.cod_especie,
        descripcion: req.body.descripcion
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
    const especie = repository.findOne({id:req.params.cod});
    if(!especie){
        return res.status(404).json({message:'especie no encontrada'})
    }
    return res.json({data: especie});
};


function add(req:Request, res:Response){
    const {cod_especie, descripcion} = req.body.sanitizedInput;

    const especieInput = new Especie(
        cod_especie,
        descripcion);

    const newSpecie = repository.add(especieInput)

    return res.status(201).send({
        message:'Especie creada',
        data:newSpecie
    });
};

function update(req:Request, res:Response){
    req.body.sanitizedInput.cod_especie = req.params.cod;
    const esp= repository.update(req.body.sanitizedInput)

    if(!esp){
        return res.status(404).json({
            message: "Especie no encontrada"
        });
    }

    return res.status(200).send({
        message: 'Especie actualizado correctamente',
        data: esp
    });
};

function remove(req:Request, res:Response){
    const id = req.params.cod;
    const specieDeleted= repository.delete({id})

    if(!specieDeleted){
      return res.status(404).send({message:'Especie no encontrada'})
    }else{
        return res.status(200).send({message:'Especie borrada exitosamente'});
    }
};


export {findAll, findOne, add, sanitizeEspecieInput, update, remove}