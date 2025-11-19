import express from "express"
import {  login, testcontroller } from "../controller/testcontroller.js";

const testrouter=express.Router();
testrouter.get("/users",testcontroller);
testrouter.post("/login",login);
export default testrouter;

// testrouter.get("/callme",callme);
