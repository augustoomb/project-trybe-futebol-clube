import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';

const matchesRouter = Router();
const matchesController = new MatchesController();

matchesRouter.get('/matches', matchesController.getAll);
matchesRouter.post('/matches', matchesController.create);


export default matchesRouter;
