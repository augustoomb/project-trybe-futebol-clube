import { Router } from 'express';
import LeaderboardsController from '../controllers/leaderboards.controller';

const leaderboardsRouter = Router();
const leaderboardsController = new LeaderboardsController();

leaderboardsRouter.get('/leaderboard/home', leaderboardsController.getLeaderboardHome);
leaderboardsRouter.get('/leaderboard/away', leaderboardsController.getLeaderboardAway);


export default leaderboardsRouter;
