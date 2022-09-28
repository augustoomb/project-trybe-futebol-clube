import { Router } from 'express';
import UsersController from '../controllers/users.controller';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/login', usersController.login);
usersRouter.get('/user', usersController.getAll);

export default usersRouter;
