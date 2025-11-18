import express from "express"
import { callme, testcontroller } from "../controller/testcontroller.js";

const testrouter=express.Router();
testrouter.get("/users",testcontroller);
export default testrouter;

testrouter.get("/callme",callme);