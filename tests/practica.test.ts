import request from "supertest";
import { describe, it, expect, afterAll } from "vitest";
import { app } from "../src/app"; 
import * as dotenv from "dotenv";

dotenv.config();

describe("🔬 Pruebas para la API de Prácticas", () => {
    let token: string;
    let practicaId: string;


    it("✅ Debería autenticarse y obtener un token", async () => {
        try {
            const loginRes = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'admin@admin.com',
                    password: 'Password1',
                });

            token = loginRes.body.token;
            expect(token).toBeDefined();
        } catch (error) {
            throw error;
        }
    });

    it("✅ Debería obtener todas las prácticas", async () => {
        try {
            const res = await request(app)
                .get("/api/practicas")
                .set("Authorization", `Bearer ${token}`);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("data");
            expect(Array.isArray(res.body.data)).toBe(true);
        } catch (error) {
            throw error;
        }
    });

    it("✅ Debería crear una nueva práctica", async () => {
        try {
            const res = await request(app)
                .post("/api/practicas")
                .set("Authorization", `Bearer ${token}`)
                .send({ descripcion: "Castración" });

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty("data");
            expect(res.body.data).toHaveProperty("id");

            practicaId = res.body.data.id;
        } catch (error) {
            throw error;
        }
    });

    it("✅ Debería obtener una práctica por ID", async () => {
        try {
            const res = await request(app)
                .get(`/api/practicas/${practicaId}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("data");
            expect(res.body.data.id).toBe(practicaId);
        } catch (error) {
            throw error;
        }
    });

    it("✅ Debería actualizar una práctica", async () => {
        try {
            const res = await request(app)
                .put(`/api/practicas/${practicaId}`)
                .set("Authorization", `Bearer ${token}`)
                .send({ descripcion: "Consulta general" });

            expect(res.status).toBe(200);
            expect(res.body.data.descripcion).toBe("Consulta general");
        } catch (error) {
            throw error;
        }
    });

    it("✅ Debería eliminar una práctica", async () => {
        try {
            const res = await request(app)
                .delete(`/api/practicas/${practicaId}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.status).toBe(200);
            expect(res.body.message).toBe("Practica eliminada correctamente");
        } catch (error) {
            throw error;
        }
    });

    it("🚨 No debería encontrar una práctica eliminada", async () => {
        try {
            const res = await request(app)
                .get(`/api/practicas/${practicaId}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.status).toBe(500);
        } catch (error) {
            throw error;
        }
    });
});
