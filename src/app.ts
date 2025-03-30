import 'reflect-metadata'
import express from "express";
import cors from "cors";
import { indexRouter } from "./routes.js";
import { orm } from './shared/db/orm.js';
import {RequestContext} from '@mikro-orm/core';
import swaggerUi from 'swagger-ui-express';
import swaggerDocumentation from './swagger.json' assert {type: "json"};

const app = express();

app.use(cors());

app.use(express.json());

app.use((req, res, next)=>{
    RequestContext.create(orm.em, next)
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentation));

app.use('/api', indexRouter)

export {app}
