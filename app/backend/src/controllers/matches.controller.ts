import { Request, Response } from 'express';
import MatchService from '../services/matches.service';
import { StatusCodes } from 'http-status-codes';
import Match from '../interfaces/match.interface';

class MatchesController {
  matchService = new MatchService();

  public getAll = async (_req: Request, res: Response) => {
    const matches = await this.matchService.getAll();
    res.status(StatusCodes.OK).json(matches);
  };

  public create = async (req: Request, res: Response) => {
    const match: Match = req.body;
    const createdMatch = await this.matchService.create(match);

    res.status(StatusCodes.CREATED).json(createdMatch);
  };
}

export default MatchesController;
