import request from "supertest";
import { app } from "../src/app";

import * as dotenv from "dotenv";
dotenv.config();

describe('Usuarios API', () => {

    let userId: string;
    let token: string;

    it('Debe crear un nuevo usuario', async () => {
        const res = await request(app)
            .post('/api/usuarios')
            .send({
                nombre: 'test',
                apellido: 'test',
                email: 'a@b.com',
                password: 'Password1',
                telefono: '3653202563',
                nro_doc: '45632025',
                direccion: 'Tested 112',
                rol: process.env.USER_TYPE_ID,
            });

        userId = res.body.data.id;

        expect(res.status).toBe(201);
        expect(res.body.message).toBe("Usuario creado");
        expect(res.body.data).toBeDefined();
        expect(res.body.data.id).toBeDefined();
    });

    it('Debe loguearse para obtener un token de acceso', async () => {
        const loginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'a@b.com',
                password: 'Password1',
            })

            token = loginRes.body.token;
            expect(token).toBeDefined();
    });

    it('Debe encontrar al usuario por su ID', async () => {
        const res = await request(app)
            .get(`/api/usuarios/${userId}`);

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Usuario encontrado");
        expect(res.body.data).toBeDefined();
        expect(res.body.data.id).toBe(userId);
    });

    it('Debe modificar al usuario ', async () => {
        const updatedData = {
            nombre: 'Test',
            apellido: 'Tested',
        };

        const res = await request(app)
            .put(`/api/usuarios/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedData);


        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Usuario actualizado correctamente");
        expect(res.body.data.nombre).toBe(updatedData.nombre);
        expect(res.body.data.apellido).toBe(updatedData.apellido);
    });

    it('Debe eliminar al usuario', async () => {
        const res = await request(app)
            .delete(`/api/usuarios/${userId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
    })



});