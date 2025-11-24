import express from "express";
import {
  addVacancy,
  deleteVacancy,
  getVacancy,
} from "../controller/vacancy.controller.js";
import { isLogin } from "../middlewares/isLogin.js";

const vacancyrouter = express.Router();
vacancyrouter.post("/add-vacancy", isLogin, addVacancy);
vacancyrouter.get("/get-vacancy", isLogin, getVacancy);
vacancyrouter.delete("/delete-vacancy/:id", isLogin, deleteVacancy);

export default vacancyrouter;
