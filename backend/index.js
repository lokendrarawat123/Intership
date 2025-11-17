import express from "express";
import dotenv from "dotenv";
import db from "./config/dbconnection.js";
dotenv.config();
const app=express();

const port=process.env.port;

app.get("/api/school/users", (req,res)=>{
    res.send("hello im here ")
});
try {
    db.connect();
    console.log('my sql connect succesfull');
    app.listen(port,()=>{                   //arrow function ()=>
    console.log(`server is running  in port ${port}`)
})
    
} catch (error) {
   console.error("mysql connection failed",error) ;
}