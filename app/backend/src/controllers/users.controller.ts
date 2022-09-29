import { Request, Response } from "express";
import UserService from '../services/users.service';
import { StatusCodes } from 'http-status-codes';
import User from "../interfaces/user.interface";
// import { RequestAuth } from "../interfaces/requestAuth.interface";

class UsersController {
  userService = new UserService();

  public login = async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;

    const token = await this.userService.login({ email, password });
    if (!token) {
      res.status(401).json({ message: 'Incorrect email or password' })
    } else {
      res.status(200).json({ token: token });
    }
  };

  // public getAll = async (_req: Request, res: Response) => {
  //   const users = await this.userService.getAll();
  //   res.status(StatusCodes.OK).json(users);
  // }

  public loginValidate = (req: Request, res: Response) => {
    const { user } = req.body;
    res.status(200).json({ role: user.payload.role })
  }
}

export default UsersController;
