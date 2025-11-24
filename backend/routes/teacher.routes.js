import express from "express";
import {
  addTeacher,
  deleteTeacher,
  getTeacher,
  updateTeacher,
} from "../controller/teacher.controller.js";
import { isLogin } from "../middlewares/isLogin.js";
const teacherRouter = express.Router();
teacherRouter.post("/add-teacher", isLogin, addTeacher);
teacherRouter.get("/get-teacher", isLogin, getTeacher);
teacherRouter.delete("/delete-teacher/:id", isLogin, deleteTeacher);
teacherRouter.patch("/update-teacher/:id", isLogin, updateTeacher);

export default teacherRouter;
