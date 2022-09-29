import { NextFunction, Request, Response } from "express";
import UserLogin from '../interfaces/userLogin.interface';
import { StatusCodes } from 'http-status-codes';

const Joi = require('joi');

const schemaObjUser = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(7),
})

const messageError = (typeError: string) => {
  if (typeError === 'string.email' || typeError === 'string.min') {
    return 'Incorrect email or password';
  } else {
    return 'All fields must be filled';
  }
}

function validationUserLogin(req: Request, res: Response, next: NextFunction) {
  const userLogin: UserLogin = req.body;

  if (schemaObjUser.validate(userLogin).error) {
    const typeError = schemaObjUser.validate(userLogin).error?.details[0].type;
    // return res.status(StatusCodes.BAD_REQUEST).json({ message: 'All fields must be filled' })
    return res.status(StatusCodes.BAD_REQUEST).json({ message: messageError(typeError) })
  }

  next();
}

export default validationUserLogin;
