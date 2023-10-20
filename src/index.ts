import { app } from "./app.js";
import { connectDb } from "./shared/db/conn.js";
import * as dotenv from "dotenv";

dotenv.config();


connectDb();

app.listen(process.env.PORT, ()=>{
    console.log('Server running on port http://localhost:3000/');
});

