import 'reflect-metadata';
import express from "express";
import cors from "cors";
import { indexRouter } from "./routes.js";
import { orm } from './shared/db/orm.js';
import { RequestContext } from '@mikro-orm/core';
const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    RequestContext.create(orm.em, next);
});
app.use('/api', indexRouter);
export { app };
//# sourceMappingURL=app.js.map