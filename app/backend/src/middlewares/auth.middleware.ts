import { Request, NextFunction, Response } from "express";
import { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import JwtTokenHelpers from "../helpers/jwtTokenHelpers";
// import { RequestAuth } from "../interfaces/requestAuth.interface";

function validationAuth(req: Request, res: Response, next: NextFunction) {
  const jwtTokenHelpers = new JwtTokenHelpers();
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ message: 'Token not found' });
  } else {
    const checkedToken = jwtTokenHelpers.verifyToken(authorization);
    if (checkedToken instanceof JsonWebTokenError) {
      res.status(401).json({ message: 'Invalid token' });
    } else {
      req.body.user = checkedToken;
      next();
    }
  }
}

export default validationAuth;
