import { MikroORM } from "@mikro-orm/core";
import * as dotenv from "dotenv";
import { orm } from "../src/shared/db/orm";

dotenv.config();

beforeAll(async () => {
    await orm.connect();
});

afterAll(async () => {
    await orm.close();
});