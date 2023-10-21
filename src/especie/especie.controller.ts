import { Request, Response, NextFunction } from "express";
import { Especie } from "./especie.entity.js";



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


export {findAll, findOne, add, sanitizeEspecieInput, update, remove}