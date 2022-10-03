import { Request, NextFunction, Response } from "express";
import { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import JwtTokenHelpers from "../helpers/jwtTokenHelpers";

// ESTA FUNÇÃO VALIDA E MANDA OS DADOS DESCRIPTOGRAFADOS DO TOKEN PARA O CONTROLLER
function validationAuth(req: Request, res: Response, next: NextFunction) {
  const jwtTokenHelpers = new JwtTokenHelpers();
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ message: 'Token must be a valid token' });
  } else {
    const checkedToken = jwtTokenHelpers.verifyToken(authorization);
    if (checkedToken instanceof JsonWebTokenError) {
      res.status(401).json({ message: 'Token must be a valid token' });
    } else {
      req.body.user = checkedToken;
      next();
    }
  }
}

export default validationAuth;

// ESTA FUNÇÃO VALIDA E NÃO MANDA OS DADOS DESCRIPTOGRAFADOS DO TOKEN PARA O CONTROLLER
function simpleValidationAuth(req: Request, res: Response, next: NextFunction) {
  const jwtTokenHelpers = new JwtTokenHelpers();
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ message: 'Token must be a valid token' });
  } else {
    const checkedToken = jwtTokenHelpers.verifyToken(authorization);
    if (checkedToken instanceof JsonWebTokenError) {
      res.status(401).json({ message: 'Token must be a valid token' });
    } else {
      next();
    }
  }
}

export { simpleValidationAuth };

// REFATORAR!!!
