import { Request, Response, NextFunction } from "express";
import { Atencion } from "./atencion.entity.js";
import { Mascota } from "../mascota/mascota.entity.js";
import { Veterinario } from "../veterinario/veterinario.entity.js";
import { Practica } from "../practica/practica.entity.js";
import { orm } from "../shared/db/orm.js";

const em = orm.em;
em.getRepository(Atencion);

async function sanitizeAtencionInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
        fecha_hora_atencion: req.body.fecha_hora_atencion,
        forma_de_pago: req.body.forma_de_pago,
        importe: req.body.importe,
        veterinario: req.body.veterinario,
        mascota: req.body.mascota,
        practicas: req.body.practicas,
        pagos: req.body.pagos,
        isActive: req.body.isActive,
    }
    Object.keys(req.body.sanitizedInput).forEach(key => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key]
        }
    })
    next();
}

async function findAll(req: Request, res: Response) {
    try {
        const atenciones = await em.find(Atencion, {}, { populate: ['veterinario', 'mascota', 'practicas', 'pagos'] })
        res.status(200).json({
            message: 'Atenciones encontradas',
            data: atenciones
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
        const atencion = await em.findOneOrFail(Atencion, { id }, { populate: ['veterinario', 'mascota', 'practicas', 'pagos'] });
        res.status(200).json({
            message: 'Atencion encontrada',
            data: atencion
        })
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
};

async function add(req: Request, res: Response) {
    try {
        const { role } = (req as any).user;
        const input = req.body.sanitizedInput;

        if (!input.mascota || !input.fecha_hora_atencion) {
            return res.status(400).json({ message: "La fecha y la mascota son obligatorias." });
        }


        const mascota = await em.findOne(Mascota, { id: input.mascota });
        if (!mascota) {
            return res.status(400).json({ message: "Mascota inexistente" });
        }
        if (!mascota.isActive) {
            return res.status(400).json({ message: "La mascota no esta activa" });
        }


        const fecha = new Date(input.fecha_hora_atencion);
        const desde = new Date(fecha);
        const hasta = new Date(fecha);
        desde.setMinutes(desde.getMinutes() - 5);
        hasta.setMinutes(hasta.getMinutes() + 5);
        const conflict = await em.findOne(Atencion, {
            fecha_hora_atencion: {
                $gte: desde,
                $lte: hasta
            }
        });
        if (conflict) {
            return res.status(400).json({ message: "Ese horario para la atencion ya está ocupado, escoja otro horario" });
        }



        let veterinario = null;

        if (role !== 'Usuario') {
            if (!input.veterinario) {
                return res.status(400).json({ message: "El veterinario es obligatorio." });
            }
            veterinario = await em.findOne(Veterinario, { id: input.veterinario });
            if (!veterinario) {
                return res.status(400).json({ message: "Veterinario inexistente" });
            }
            if (!veterinario.isActive) {
                return res.status(400).json({ message: "El veterinario no esta activo" });
            }

            const metodosValidos = ['Efectivo', 'Tarjeta credito/debito', 'Transferencia'];
            if (!metodosValidos.includes(input.forma_de_pago)) {
                return res.status(400).json({ message: "Método de pago inválido. Debe ser 'Efectivo', 'Tarjeta credito/debito' o 'Transferencia'." });
            }

            if (typeof input.importe !== 'number' || input.importe <= 0) {
                return res.status(400).json({ message: "El importe debe ser un número mayor a 0." });
            }

            if (!Array.isArray(input.practicas) || input.practicas.length < 1) {
                return res.status(400).json({ message: "Debe incluirse al menos una práctica." });
            }

            const practicasDB = await em.find(Practica, { id: { $in: input.practicas } });
            if (practicasDB.length !== input.practicas.length) {
                return res.status(400).json({ message: "Una o más prácticas no existen." });
            }


        } else {
            req.body.sanitizedInput = {
                fecha_hora_atencion: input.fecha_hora_atencion,
                mascota: input.mascota
            }
        }


        const newAtte = em.create(Atencion, req.body.sanitizedInput)
        await em.flush();
        return res.status(201).json({
            message: 'Atencion creada',
            data: newAtte
        });
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
};

async function update(req: Request, res: Response) {
    try {
        const { role } = (req as any).user;
        if (role === "Usuario") {
            return res.status(403).json({ message: "No tenés permisos para modificar atenciones." });
        }

        const id = req.params.id;
        const input = req.body.sanitizedInput;

        const atencion = await em.findOne(Atencion, { id });
        if (!atencion) {
            return res.status(404).json({ message: "Atencion inexistente" });
        }
        if (!atencion.isActive) {
            return res.status(400).json({ message: "La atencion no esta activa" });
        }

        if (input.veterinario) {
            const veterinario = await em.findOne(Veterinario, { id: input.veterinario });
            if (!veterinario) {
                return res.status(400).json({ message: "Veterinario inexistente" });
            }
            if (!veterinario.isActive) {
                return res.status(400).json({ message: "El veterinario no esta activo" });
            }
        }

        if (input.mascota) {
            const mascota = await em.findOne(Mascota, { id: input.mascota });
            if (!mascota) {
                return res.status(400).json({ message: "Mascota inexistente" });
            }
            if (!mascota.isActive) {
                return res.status(400).json({ message: "La mascota no esta activa" });
            }
        }

        if (input.fecha_hora_atencion) {
            const fecha = new Date(input.fecha_hora_atencion);
            const desde = new Date(fecha);
            const hasta = new Date(fecha);
            desde.setMinutes(desde.getMinutes() - 5);
            hasta.setMinutes(hasta.getMinutes() + 5);
            const conflict = await em.findOne(Atencion, {
                fecha_hora_atencion: {
                    $gte: desde,
                    $lte: hasta
                },
                id: { $ne: id }
            });
            if (conflict && conflict._id?.toString() !== id) {
                return res.status(400).json({ message: "Ese horario para la atencion ya está ocupado, escoja otro horario" });
            }
        }

        if (input.forma_de_pago) {
            const metodosValidos = ['Efectivo', 'Tarjeta credito/debito', 'Transferencia'];
            if (!metodosValidos.includes(input.forma_de_pago)) {
                return res.status(400).json({ message: "Método de pago inválido. Debe ser 'Efectivo', 'Tarjeta credito/debito' o 'Transferencia'." });
            }
        }


        if (!input.fecha_hora_atencion && !input.mascota && !input.veterinario && !input.forma_de_pago && !input.importe && !input.practicas && !input.pagos) {
            return res.status(400).json({ message: "Debes enviar al menos un campo para actualizar." });
        }

        if (input.importe) {
            if (typeof input.importe !== 'number' || input.importe <= 0) {
                return res.status(400).json({ message: "El importe debe ser un número mayor a 0." });
            }
        }


        if (input.practicas) {
            if (!Array.isArray(input.practicas)) {
                return res.status(400).json({ message: "El campo 'practicas' debe ser un array." });
            }

            if (input.practicas.length > 0) {
                const practicasDB = await em.find(Practica, { id: { $in: input.practicas } });
                if (practicasDB.length !== input.practicas.length) {
                    return res.status(400).json({ message: "Una o más prácticas no existen." });
                }
            }
        }



        em.assign(atencion, input)
        await em.flush();
        res.status(200).send({
            message: 'Atencion actualizada correctamente',
            data: atencion
        });
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
};

async function remove(req: Request, res: Response) {
    try {
        const { role } = (req as any).user;
        if (role === "Usuario" || role === "Veterinario") {
            return res.status(403).json({ message: "No tenés permisos para modificar atenciones." });
        }
        const id = req.params.id;
        const atencionToDelete = await em.getReference(Atencion, id);
        em.removeAndFlush(atencionToDelete)
        res.status(200).json({
            message: 'Atencion eliminada correctamente'
        })
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
};

export { sanitizeAtencionInput, findAll, findOne, add, update, remove }