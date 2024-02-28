import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
import User from "../models/user.model";
import { IAuthRequest } from "../../core/interface/index.interface";

const register = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { username, email, password } = request.body;
  try {
    const _hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: _hashedPassword });
    await user.save().then((newUser) => {
      response.status(201).json({
        status: "success",
        message: "Successfully register new account",
        user: newUser,
      });
    });
  } catch (error) {
    next(error);
  }
};

const login = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { username, password } = request.body;
  try {
    const _user: any = await User.findOne({ username });
    
    if (!_user) {
      return response.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const passwordMatch = await _user.comparePassword(password);

    if (!passwordMatch) {
      return response.status(401).json({
        status: "error",
        message: "Incorrect password",
      });
    }

    const token = jwt.sign({ userId: _user._id }, process.env.SECRET_KEY, {
      expiresIn: "1 hour",
    });
    response.status(200).json({
      status: "success",
      token,
    });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (
  request: IAuthRequest,
  response: Response,
  next: NextFunction
) => {
  response.status(200).json({
    status: "success",
    message: `Welcome ${request.user.username}`,
  });
};

export { register, login, getProfile };
