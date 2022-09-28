import { NextFunction, Request, Response } from "express";
import UserLogin from '../interfaces/userLogin.interface';
import { StatusCodes } from 'http-status-codes';

const Joi = require('joi');

const schemaObjUser = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(7),
})

function validationUserLogin(req: Request, res: Response, next: NextFunction) {
  const userLogin: UserLogin = req.body;

  if (schemaObjUser.validate(userLogin).error) {
    const errorMess = schemaObjUser.validate(userLogin).error?.message;
    return res.status(StatusCodes.LENGTH_REQUIRED).json({ message: errorMess })
  }

  next();
}

export default validationUserLogin;
