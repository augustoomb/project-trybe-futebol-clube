import { Request, Response } from 'express';
import MatchService from '../services/matches.service';
import { StatusCodes } from 'http-status-codes';

class MatchesController {
  matchService = new MatchService();

  public getAll = async (_req: Request, res: Response) => {
    const matches = await this.matchService.getAll();
    res.status(StatusCodes.OK).json(matches);
  };
}

export default MatchesController;
