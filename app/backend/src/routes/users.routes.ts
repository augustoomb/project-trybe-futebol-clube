import { Router } from 'express';
import validationUserLogin from '../middlewares/usersLogin.middleware';
import UsersController from '../controllers/users.controller';
import validationAuth from '../middlewares/auth.middleware';

const usersRouter = Router();
const usersController = new UsersController();

// usersRouter.post('/login/validate', validationAuth, usersController.loginValidate);
usersRouter.post('/login', validationUserLogin, usersController.login);

export default usersRouter;
