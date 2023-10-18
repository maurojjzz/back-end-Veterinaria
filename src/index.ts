import { app } from "./app.js";
import { connectDb } from "./shared/db/conn.js";


connectDb();

app.listen(3000, ()=>{
    console.log('Server running on port http://localhost:3000/');
});

