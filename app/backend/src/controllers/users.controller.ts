import { Request, Response } from "express";
import UserService from '../services/users.service';
import { StatusCodes } from 'http-status-codes';

class UsersController {
  userService = new UserService();

  public login = async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;

    const token = await this.userService.login({ email, password });
    if (!token) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Incorrect email or password' })
    } else {
      res.status(StatusCodes.OK).json({ token: token });
    }
  };

  public loginValidate = (req: Request, res: Response) => {
    const { user } = req.body;
    res.status(StatusCodes.OK).json({ role: user.payload.role })
  }
}

export default UsersController;
