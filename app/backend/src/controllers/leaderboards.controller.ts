import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';
import { StatusCodes } from 'http-status-codes';

class LeaderboardsController {
  leaderboardService = new LeaderboardService();

  public getLeaderboardHome = async (_req: Request, res: Response) => {
    const result = await this.leaderboardService.getLeaderboardHome();
    res.status(StatusCodes.OK).json(result);
  };

  public getLeaderboardAway = async (_req: Request, res: Response) => {
    const result = await this.leaderboardService.getLeaderboardAway();
    res.status(StatusCodes.OK).json(result);
  };
}

export default LeaderboardsController;
