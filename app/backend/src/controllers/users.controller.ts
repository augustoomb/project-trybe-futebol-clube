import { Request, Response } from "express";
import UserService from '../services/users.service';
import { StatusCodes } from 'http-status-codes';

class UsersController {
  userService = new UserService();

  public login = async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await this.userService.login({ email, password });
    if (!user) res.status(StatusCodes.NOT_FOUND).json("Not Found")
    res.status(StatusCodes.OK).json(user);
  };

  public getAll = async (_req: Request, res: Response) => {
    const users = await this.userService.getAll();
    res.status(StatusCodes.OK).json(users);
  }
}

export default UsersController;
