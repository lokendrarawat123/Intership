import express from "express";
import { login, getAllusers, signout } from "../controller/authcontroller.js";
import { isLogin } from "../middlewares/isLogin.js";

const authrouter = express.Router();
authrouter.get("/users", isLogin, getAllusers);

authrouter.post("/login", login);

authrouter.post("/signout", isLogin, signout);
export default authrouter;

// authrouter.post("/getMe", getMe);
// export  default getMe;
