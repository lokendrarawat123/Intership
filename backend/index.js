import express from "express";
import dotenv from "dotenv";
import db from "./config/dbconnection.js";
import cookieParser from "cookie-parser";
//<<<<<<< HEAD
import authrouter from "./routes/authroutes.js";

//=======
// import testrouter from "./routes/testroutes.js";
//>>>>>>> fd06f1cb65709f1c8d41271a32917cb3d21906fd

dotenv.config();

const app = express();

app.use(cookieParser());
//=======
// TO PARSE JSON REQUEST BODIES
app.use(express.json());

//>>>>>>> fd06f1cb65709f1c8d41271a32917cb3d21906fd

const port = process.env.port;

app.use("/api/school/", authrouter);

try {
  db.connect();
  console.log("my sql connect succesfull");
} catch (error) {
  console.error("mysql connection failed", error);
}

app.listen(port, () => {
  //arrow function ()=>
  console.log(`server is running  in port ${port}`);
});
