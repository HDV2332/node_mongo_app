import { NextFunction, Request, Response } from "express";
import { ERRORS } from "../constants/errors";
import { IAuthRequest } from "../interface/index.interface";
const jwt = require("jsonwebtoken");
const User = require("../../server/models/user.model");

const authenticate = async (
  request: IAuthRequest,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers.authorization?.split(" ")[1];

  if (!token) {
    return response
      .status(401)
      .json({ status: "error", message: "Authentication required" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    request.user = user;
    next();
  } catch (error) {
    response
      .status(401)
      .json({ status: "error", message: ERRORS.invalid_token });
  }
};

export { authenticate };
