import express from "express";
import {
  addTeacher,
  deleteTeacher,
  getTeacher,
  updateTeacher,
} from "../controller/teacher.controller.js";
import { isLogin } from "../middlewares/isLogin.js";
import { upload } from "../utils/multer.js";
import { isAdmin } from "../middlewares/isAdmin.js";
const teacherRouter = express.Router();
teacherRouter.post(
  "/add-teacher",
  isLogin,
  isAdmin,
  upload.single("image"),
  addTeacher
);
teacherRouter.get("/get-teacher", isLogin, getTeacher);
teacherRouter.delete("/delete-teacher/:id", isLogin, isAdmin, deleteTeacher);
teacherRouter.patch(
  "/update-teacher/:id",
  isLogin,
  isAdmin,
  upload.single("image"),
  updateTeacher
);

export default teacherRouter;
