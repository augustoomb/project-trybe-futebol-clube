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

    if (createdMatch == 401) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: 'It is not possible to create a match with two equal teams' })
    }

    else if (createdMatch == 404) {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'There is no team with such id!' })
    }

    else {
      res.status(StatusCodes.CREATED).json(createdMatch);
    }
  };

  public markMatchAsFinished = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const updateMatch = await this.matchService.markMatchAsFinished(id);

    if (!updateMatch) {
      res.status(401).json({ message: 'Incorrect id' });
    } else {
      res.status(200).json({ message: 'Finished' });
    }
  }


  public updateMatchInProgress = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const homeTeamGoals = Number(req.body.homeTeamGoals);
    const awayTeamGoals = Number(req.body.awayTeamGoals);

    const updatedMatch = await this.matchService.updateMatchInProgress(id, homeTeamGoals, awayTeamGoals);

    if (!updatedMatch) {
      res.status(401).json({ message: 'Incorrect id or finished match' });
    } else {
      res.status(200).json({ message: 'Updated!' });
    }
  }
}

export default MatchesController;
