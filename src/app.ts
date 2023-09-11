import express from "express";
import { indexRouter } from "./routes.js";

const app = express();

app.use(express.json());

app.use('/api', indexRouter)

export {app}
