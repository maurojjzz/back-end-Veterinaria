import { Request, Response, NextFunction } from "express";
import { Precio } from "./precio.entity.js";
import { orm } from "../shared/db/orm.js";

const em = orm.em;
em.getRepository(Precio);

function sanitizePrecioInput(req:Request, res:Response, next:NextFunction){
    req.body.sanitizedInput = {
        fecha: req.body.fecha,
        valor: req.body.valor,
        practica: req.body.practica,
        isActive: req.body.isActive,
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
        const precios = await em.find(Precio, {}, {populate:['practica']});
        res.status(200).json({
            message: 'Precios encontrados',
            data: precios
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
        const precio = await em.findOneOrFail(Precio, { id }, {populate:['practica']});
        res.status(200).json({
            message: 'Precio encontrada',
            data: precio
        })
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
};


async function add(req: Request, res: Response) {
    try {
        const newPrecio = em.create(Precio, req.body.sanitizedInput);
        await em.flush();
        return res.status(201).json({
            message: 'Precio creado',
            data: newPrecio
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
        const precio = await em.findOneOrFail(Precio, {id});
        em.assign(precio, req.body.sanitizedInput);
        await em.flush();
        res.status(200).send({
            message: 'Precio actualizado correctamente',
            data: precio
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
        const precioToDelete = await em.getReference(Precio, id);
        em.removeAndFlush(precioToDelete);
        res.status(200).json({
            message: 'Precio eliminado correctamente'
        })
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
};


export {findAll, findOne, add, sanitizePrecioInput, update, remove}
