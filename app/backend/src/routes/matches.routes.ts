import { Router } from 'express';
import validationAuth from '../middlewares/auth.middleware';
import MatchesController from '../controllers/matches.controller';

const matchesRouter = Router();
const matchesController = new MatchesController();

matchesRouter.get('/matches', matchesController.getAll);
matchesRouter.post('/matches', matchesController.create);
matchesRouter.patch('/matches/:id/finish', matchesController.partialUpdate);


export default matchesRouter;
