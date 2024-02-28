import { Router, Request, Response } from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getById,
  updateCourse,
} from "../controllers/course.controller";
import { getProfile, login, register } from "../controllers/auth.controller";
import { authenticate } from "../../core/middleware/auth.middleware";
import { IAuthRequest } from "../../core/interface/index.interface";

const AppRouter: Router = Router();

AppRouter.use((req, res, next) => {
  if (["POST", "PUT", "PATCH"].indexOf(req.method) !== -1 && !req.is("json")) {
    return res.status(415).send("Content-Type must be application/json");
  }

  return next();
});

// Auth module
AppRouter.post("/auth/register", register);
AppRouter.post("/auth/login", login);
AppRouter.get("/profile", authenticate, getProfile);

// Course module
AppRouter.post("/courses", createCourse);
AppRouter.get("/courses", getAllCourses);
AppRouter.get("/courses/:courseId", getById);
AppRouter.patch("/courses/:courseId", updateCourse);
AppRouter.delete("/courses/:courseId", deleteCourse);

module.exports = AppRouter;
