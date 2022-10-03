import { NextFunction, Request, Response } from "express";
import UserLogin from '../interfaces/userLogin.interface';
import { StatusCodes } from 'http-status-codes';

const Joi = require('joi');

const schemaObjUser = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(7),
})

const objError = (typeError: string) => {
  if (typeError === 'string.email' || typeError === 'string.min') {
    return {
      message: 'Incorrect email or password',
      code: StatusCodes.UNAUTHORIZED,
    }
  } else {
    return {
      message: 'All fields must be filled',
      code: StatusCodes.BAD_REQUEST,
    }
  }
}

async function validationUserLogin(req: Request, res: Response, next: NextFunction) {
  const userLogin: UserLogin = await req.body;

  if (schemaObjUser.validate(userLogin).error) {
    const typeError = schemaObjUser.validate(userLogin).error?.details[0].type;
    const error = objError(typeError);
    return res.status(error.code).json({ message: error.message })
  }

  next();
}

export default validationUserLogin;
