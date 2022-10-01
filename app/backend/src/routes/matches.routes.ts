import { Router } from 'express';
import { simpleValidationAuth } from '../middlewares/auth.middleware';
import MatchesController from '../controllers/matches.controller';

const matchesRouter = Router();
const matchesController = new MatchesController();

matchesRouter.get('/matches', matchesController.getAll);
matchesRouter.post('/matches', simpleValidationAuth, matchesController.create);
matchesRouter.patch('/matches/:id/finish', matchesController.markMatchAsFinished);
matchesRouter.patch('/matches/:id', matchesController.updateMatchInProgress);


export default matchesRouter;
