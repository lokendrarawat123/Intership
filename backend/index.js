import express from "express";
import dotenv from "dotenv";
const app=express();
dotenv.config();
const port=process.env.port;
app.listen(port,()=>{                   //arrow function ()=>
    console.log(`server is running  in port ${port}`)
})