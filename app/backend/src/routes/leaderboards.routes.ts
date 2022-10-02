import { Router } from 'express';
import LeaderboardsController from '../controllers/leaderboards.controller';

const leaderboardsRouter = Router();
const teamsController = new LeaderboardsController();

leaderboardsRouter.get('/leaderboard/home', teamsController.getLeaderboardHome);


export default leaderboardsRouter;
