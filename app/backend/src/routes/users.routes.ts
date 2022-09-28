import { Router } from 'express';
import validationUserLogin from '../middlewares/usersLogin.middleware';
import UsersController from '../controllers/users.controller';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/login', validationUserLogin, usersController.login);
usersRouter.get('/user', usersController.getAll); // apenas testando

export default usersRouter;
