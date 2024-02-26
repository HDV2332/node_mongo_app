import mongoose from "mongoose";
import Course from "../models/course.model";
import { Request, Response } from "express";
import { ERRORS } from "../../definitions/constants/errors";

const createCourse = (request: Request, response: Response) => {
  const course = new Course({
    _id: new mongoose.Types.ObjectId(),
    title: request.body.title,
    description: request.body.description,
  });

  return course
    .save()
    .then((newCourse) => {
      return response.status(201).json({
        status: "success",
        message: "Successfully create new course",
        Course: newCourse,
      });
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({
        status: "error",
        message: ERRORS.unexpected,
        error: error.message,
      });
    });
};

const getAllCourses = (request: Request, response: Response) => {
  Course.find()
    .select("_id title description")
    .then((allCourses) => {
      return response.status(200).json({
        status: "success",
        Course: allCourses,
      });
    })
    .catch((err) => {
      response.status(500).json({
        status: "error",
        message: ERRORS.unexpected,
        error: err.message,
      });
    });
};

const getById = (request: Request, response: Response) => {
  const _id = request.params.courseId;
  console.log({ _id });
  Course.findById(_id)
    .then((singleCourse) => {
      response.status(200).json({
        status: "success",
        Course: singleCourse,
      });
    })
    .catch((err) => {
      response.status(500).json({
        status: "error",
        message: ERRORS.not_found,
        error: err.message,
      });
    });
};

const updateCourse = (request: Request, response: Response) => {
  const _id = request.params.courseId;
  const updateObject = request.body;
  Course.findByIdAndUpdate({ _id }, updateObject)
    .then((updatedCourse) => {
      response.status(200).json({
        status: "success",
        Course: updatedCourse,
      });
    })
    .catch((err) => {
      response.status(500).json({
        status: "error",
        message: ERRORS.not_found,
        error: err.message,
      });
    });
};

const deleteCourse = (request: Request, response: Response) => {
  const _id = request.params.courseId;
  Course.findByIdAndDelete(_id)
    .exec()
    .then(() =>
      response.status(204).json({
        status: "success",
        message: ERRORS.delete.success,
      })
    )
    .catch((err) =>
      response.status(500).json({
        status: "error",
        message: err.message,
      })
    );
};

export { createCourse, getAllCourses, getById, updateCourse, deleteCourse };
