import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';

const teamsRouter = Router();
const teamsController = new TeamsController();

teamsRouter.get('/teams', teamsController.getAll);
teamsRouter.get('/teams/:id', teamsController.getById);


export default teamsRouter;
