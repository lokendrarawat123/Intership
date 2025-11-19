import express from "express"
import { login } from "../controller/authcontroller.js";

const authrouter=express.Router();
// authrouter.get("/users",testcontroller);



authrouter.post("/login",login);
export default authrouter;