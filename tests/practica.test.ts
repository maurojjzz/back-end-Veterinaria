import request from "supertest";
import { describe, it, expect, afterAll } from "vitest";
import { app } from "../src/app"; 
import * as dotenv from "dotenv";

dotenv.config();

describe("🔬 Pruebas para la API de Prácticas", () => {
    let token: string;
    let practicaId: string;
    let userId: string;

    it("✅ Debería crear un usuario de prueba", async () => {
        try {
            console.log("📤 Creando usuario de prueba...");
            const res = await request(app)
                .post('/api/usuarios')
                .send({
                    nombre: 'test',
                    apellido: 'test',
                    email: 'test_practicas@example.com',
                    password: 'Password123',
                    telefono: '3653202563',
                    nro_doc: '45632025',
                    direccion: 'Tested 112',
                    rol: process.env.USER_TYPE_ID,
                });

            console.log("📊 Respuesta de creación de usuario:", {
                status: res.status,
                body: res.body
            });

            userId = res.body.data.id;
            expect(res.status).toBe(201);
            expect(res.body.data).toBeDefined();
            expect(res.body.data.id).toBeDefined();
            console.log(`✅ Usuario creado con ID: ${userId}`);
        } catch (error) {
            console.error("❌ Error al crear usuario de prueba:", error);
            throw error;
        }
    });
    it("✅ Debería autenticarse y obtener un token", async () => {
        try {
            console.log("🔑 Intentando autenticar usuario de prueba...");
            const loginRes = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'test_practicas@example.com',
                    password: 'Password123',
                });

            console.log("📊 Respuesta de autenticación:", {
                status: loginRes.status,
                body: JSON.stringify(loginRes.body, null, 2)
            });

            token = loginRes.body.token;
            expect(token).toBeDefined();
            console.log("✅ Token obtenido correctamente");
        } catch (error) {
            console.error("❌ Error en la autenticación:", error);
            throw error;
        }
    });

    it("✅ Debería obtener todas las prácticas", async () => {
        try {
            console.log("📤 Enviando solicitud GET a /api/practicas");
            const res = await request(app)
                .get("/api/practicas")
                .set("Authorization", `Bearer ${token}`);

            console.log("📊 Respuesta:", {
                status: res.status,
                headers: res.headers,
                body: res.body
            });

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("data");
            expect(Array.isArray(res.body.data)).toBe(true);
            console.log("✅ Prueba de obtener todas las prácticas completada");
        } catch (error) {
            console.error("❌ Error en la prueba:", error);
            throw error;
        }
    });

    it("✅ Debería crear una nueva práctica", async () => {
        try {
            console.log("📤 Enviando solicitud POST a /api/practicas");
            const res = await request(app)
                .post("/api/practicas")
                .set("Authorization", `Bearer ${token}`)
                .send({ descripcion: "Castración" });

            console.log("📊 Respuesta:", {
                status: res.status,
                body: res.body
            });

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty("data");
            expect(res.body.data).toHaveProperty("id");

            practicaId = res.body.data.id;
            console.log(`✅ Práctica creada con ID: ${practicaId}`);
        } catch (error) {
            console.error("❌ Error en la prueba:", error);
            throw error;
        }
    });

    it("✅ Debería obtener una práctica por ID", async () => {
        try {
            console.log(`📤 Enviando solicitud GET a /api/practicas/${practicaId}`);
            const res = await request(app)
                .get(`/api/practicas/${practicaId}`)
                .set("Authorization", `Bearer ${token}`);

            console.log("📊 Respuesta:", {
                status: res.status,
                body: res.body
            });

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("data");
            expect(res.body.data.id).toBe(practicaId);
            console.log("✅ Prueba de obtener práctica por ID completada");
        } catch (error) {
            console.error("❌ Error en la prueba:", error);
            throw error;
        }
    });

    it("✅ Debería actualizar una práctica", async () => {
        try {
            console.log(`📤 Enviando solicitud PUT a /api/practicas/${practicaId}`);
            const res = await request(app)
                .put(`/api/practicas/${practicaId}`)
                .set("Authorization", `Bearer ${token}`)
                .send({ descripcion: "Consulta general" });

            console.log("📊 Respuesta:", {
                status: res.status,
                body: res.body
            });

            expect(res.status).toBe(200);
            expect(res.body.data.descripcion).toBe("Consulta general");
            console.log("✅ Prueba de actualizar práctica completada");
        } catch (error) {
            console.error("❌ Error en la prueba:", error);
            throw error;
        }
    });

    it("✅ Debería eliminar una práctica", async () => {
        try {
            console.log(`📤 Enviando solicitud DELETE a /api/practicas/${practicaId}`);
            const res = await request(app)
                .delete(`/api/practicas/${practicaId}`)
                .set("Authorization", `Bearer ${token}`);

            console.log("📊 Respuesta:", {
                status: res.status,
                body: res.body
            });

            expect(res.status).toBe(200);
            expect(res.body.message).toBe("Practica eliminada correctamente");
            console.log("✅ Prueba de eliminar práctica completada");
        } catch (error) {
            console.error("❌ Error en la prueba:", error);
            throw error;
        }
    });

    it("🚨 No debería encontrar una práctica eliminada", async () => {
        try {
            console.log(`📤 Enviando solicitud GET a /api/practicas/${practicaId} (debería fallar)`);
            const res = await request(app)
                .get(`/api/practicas/${practicaId}`)
                .set("Authorization", `Bearer ${token}`);

            console.log("📊 Respuesta para práctica eliminada:", {
                status: res.status,
                body: res.body
            });
            expect(res.status).toBe(500);
            console.log("✅ Prueba de verificar práctica eliminada completada");
        } catch (error) {
            console.error("❌ Error en la prueba:", error);
            throw error;
        }
    });
    });
