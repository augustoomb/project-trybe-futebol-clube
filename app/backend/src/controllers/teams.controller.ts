import { Request, Response } from 'express';
import TeamService from '../services/teams.service';
import { StatusCodes } from 'http-status-codes';

class TeamsController {
  teamService = new TeamService();

  public getAll = async (_req: Request, res: Response) => {
    const teams = await this.teamService.getAll();
    res.status(StatusCodes.OK).json(teams);
  };
}

export default TeamsController;
