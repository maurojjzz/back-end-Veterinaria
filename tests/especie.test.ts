import request from "supertest";
import { describe, it, expect, afterAll } from "vitest";
import { app } from "../src/app"; 
import * as dotenv from "dotenv";

dotenv.config();

describe("🔬 Pruebas para la API de Especies", () => {
    let token: string;
    let especieId: string;

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

    it("✅ Debería obtener todas las especies", async () => {
        try {
            const res = await request(app)
                .get("/api/especies")
                .set("Authorization", `Bearer ${token}`);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("data");
            expect(Array.isArray(res.body.data)).toBe(true);
        } catch (error) {
            throw error;
        }
    });

    it("✅ Debería crear una nueva especie", async () => {
        try {
            const res = await request(app)
                .post("/api/especies")
                .set("Authorization", `Bearer ${token}`)
                .send({ descripcion: "Reptil" });

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty("data");
            expect(res.body.data).toHaveProperty("id");

            especieId = res.body.data.id;
        } catch (error) {
            throw error;
        }
    });

    it("✅ Debería obtener una especie por ID", async () => {
        try {
            const res = await request(app)
                .get(`/api/especies/${especieId}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("data");
            expect(res.body.data.id).toBe(especieId);
            expect(res.body.data.descripcion).toBe("Reptil");
        } catch (error) {
            throw error;
        }
    });

    it("✅ Debería actualizar una especie", async () => {
        try {
            const res = await request(app)
                .put(`/api/especies/${especieId}`)
                .set("Authorization", `Bearer ${token}`)
                .send({ descripcion: "Anfibio" });

            expect(res.status).toBe(200);
            expect(res.body.data.descripcion).toBe("Anfibio");
        } catch (error) {
            throw error;
        }
    });

    it("✅ Debería eliminar una especie", async () => {
        try {
            const res = await request(app)
                .delete(`/api/especies/${especieId}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.status).toBe(200);
            expect(res.body.message).toBe("Especie eliminada correctamente");
        } catch (error) {
            throw error;
        }
    });

    it("🚨 No debería encontrar una especie eliminada", async () => {
        try {
            const res = await request(app)
                .get(`/api/especies/${especieId}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.status).toBe(500);
        } catch (error) {
            throw error;
        }
    });
});