import swaggerAutogen from "swagger-autogen";
import * as dotenv from "dotenv";
dotenv.config();
const outputFile = "./swagger.json";
const endPointsFiles = ["./src/routes.ts"];
const doc = {
    info: {
        title: 'Veterinaria API',
        description: 'Documentación de la API de la veterinaria',
        version: '1.0.0',
    },
    host: process.env.VERCEL_URL || `localhost:${process.env.PORT}`,
    basePath: '/api',
    schemes: ['http, https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
        BearerAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: 'Utilizar el formato "Bearer <token>" en el header para autenticar las solicitudes.',
        },
    },
};
swaggerAutogen()(outputFile, endPointsFiles, doc);
//# sourceMappingURL=swagger.js.map