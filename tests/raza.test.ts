import request from "supertest";
import { describe, it, expect, afterAll } from "vitest";
import { app } from "../src/app";
import * as dotenv from "dotenv";

dotenv.config();

describe("🔬 Pruebas para la API de Razas", () => {
    let token: string;
    let razaId: string;

    it("✅ Debería autenticarse y obtener un token", async () => {
        const loginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'admin@admin.com',
                password: 'Password1',
            });

        token = loginRes.body.token;
        expect(token).toBeDefined();
    });

    it("✅ Debería obtener todas las razas", async () => {
        const res = await request(app)
            .get("/api/raza")
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("data");
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    it("✅ Debería crear una nueva raza", async () => {
        const res = await request(app)
            .post("/api/raza")
            .set("Authorization", `Bearer ${token}`)
            .send({ descripcion: "Siamés", especie: "654539ed0a3f65743cef870f" });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("data");
        expect(res.body.data).toHaveProperty("id");

        razaId = res.body.data.id;
    });

    it("✅ Debería obtener una raza por ID", async () => {
        const res = await request(app)
            .get(`/api/raza/${razaId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("data");
        expect(res.body.data.id).toBe(razaId);
        expect(res.body.data.descripcion.toLowerCase()).toBe("siamés");
    });

    it("✅ Debería actualizar una raza", async () => {
        const res = await request(app)
            .put(`/api/raza/${razaId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ descripcion: "Bengalí" });

        expect(res.status).toBe(200);
        expect(res.body.data.descripcion.toLowerCase()).toBe("bengalí");
    });

    it("✅ Debería eliminar una raza", async () => {
        const res = await request(app)
            .delete(`/api/raza/${razaId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.message.toLowerCase()).toBe("raza eliminada correctamente");
    });

    it("🚨 No debería encontrar una raza eliminada", async () => {
        const res = await request(app)
            .get(`/api/raza/${razaId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(500);
    });
});
