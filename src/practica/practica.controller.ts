import { Request, Response, NextFunction } from "express";
import {Practica } from "./practica.entity.js";
import { orm } from "../shared/db/orm.js";

const em = orm.em;
em.getRepository(Practica);

function sanitizeEspecieInput(req:Request, res:Response, next:NextFunction){
    req.body.sanitizedInput = {
        descripcion: req.body.descripcion
    }
    Object.keys(req.body.sanitizedInput).forEach(key => {
        if(req.body.sanitizedInput[key] === undefined){
            delete req.body.sanitizedInput[key]
        }
    } )
    next();
}

async function findAll(req: Request, res: Response) {
    try {
        const practica = await em.find(Practica, {});
        res.status(200).json({
            message: 'Practicas encontradas',
            data: practica
        });
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
};

async function findOne(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const practica = await em.findOneOrFail(Practica, { id });
        res.status(200).json({
            message: 'Práctica encontrada',
            data: practica
        })
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
};


async function add(req: Request, res: Response) {
    try {
        const newPractica = em.create(Practica, req.body.sanitizedInput);
        await em.flush();
        return res.status(201).json({
            message: 'Práctica creada',
            data: newPractica
        });
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
};

async function update(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const practica = await em.findOneOrFail(Practica, {id});
        em.assign(practica, req.body.sanitizedInput);
        await em.flush();
        res.status(200).send({
            message: 'Práctica actualizada correctamente',
            data: practica
        });
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
};

async function remove(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const practicaToDelete = await em.getReference(Practica, id);
        em.removeAndFlush(practicaToDelete);
        res.status(200).json({
            message: 'Practica eliminada correctamente'
        })
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
};


export {findAll, findOne, add, sanitizeEspecieInput, update, remove}
