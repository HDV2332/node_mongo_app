import { Router, Request, Response } from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getById,
  updateCourse,
} from "../controllers/course.controller";

const AppRouter: Router = Router();

AppRouter.use((req, res, next) => {
  if (["POST", "PUT", "PATCH"].indexOf(req.method) !== -1 && !req.is("json")) {
    return res.status(415).send("Content-Type must be application/json");
  }

  return next();
});

// course module
AppRouter.post("/courses", createCourse);
AppRouter.get("/courses", getAllCourses);
AppRouter.get("/courses/:courseId", getById);
AppRouter.patch("/courses/:courseId", updateCourse);
AppRouter.delete("/courses/:courseId", deleteCourse);

module.exports = AppRouter;
