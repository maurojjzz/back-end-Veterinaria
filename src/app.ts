import 'reflect-metadata'
import express from "express";
import cors from "cors";
import { indexRouter } from "./routes.js";
import { orm } from './shared/db/orm.js';
import {RequestContext} from '@mikro-orm/core';
import swaggerUi from 'swagger-ui-express';
import swaggerDocumentation from './swagger.json' assert {type: "json"};
const CSS_URL = "https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui.css";

const app = express();

app.use(cors());

app.use(express.json());

app.use((req, res, next)=>{
    RequestContext.create(orm.em, next)
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentation, {
    customCssUrl: CSS_URL
}));

app.use('/api', indexRouter)

export {app}
