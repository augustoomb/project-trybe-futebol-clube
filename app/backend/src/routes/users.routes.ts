import { Router } from 'express';
import validationUserLogin from '../middlewares/usersLogin.middleware';
import UsersController from '../controllers/users.controller';
import validationAuth from '../middlewares/auth.middleware';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/login/validate', validationAuth, usersController.loginValidate); // valida o token e, se validado, envia os dados ao controller
usersRouter.post('/login', validationUserLogin, usersController.login); // valida os dados de login com o Joi

export default usersRouter;
