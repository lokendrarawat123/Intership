import express from "express";
import dotenv from "dotenv";
import db from "./config/dbconnection.js";
import testrouter from "./routes/testroutes.js";
dotenv.config();


const app=express();

const port=process.env.port;

app.use("/api/school/",testrouter)

try {
    db.connect();
    console.log('my sql connect succesfull');
   
    
} catch (error) {
   console.error("mysql connection failed",error) ;
}

 app.listen(port,()=>{                   //arrow function ()=>
    console.log(`server is running  in port ${port}`)
})