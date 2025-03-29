import { MikroORM } from "@mikro-orm/core";
import { MongoHighlighter } from "@mikro-orm/mongo-highlighter";
import * as dotenv from "dotenv";

dotenv.config();

const isTest = process.env.NODE_ENV === 'test'

export const orm = await MikroORM.init({
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    dbName: process.env.DB_NAME,
    clientUrl: isTest ? process.env.DB_URI_TEST : process.env.DB_URI,
    type: 'mongo',
    highlighter: new MongoHighlighter,
    debug: true
})





