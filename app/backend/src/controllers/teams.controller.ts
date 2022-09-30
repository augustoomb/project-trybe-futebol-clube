import { Request, Response } from 'express';
import TeamService from '../services/teams.service';
import { StatusCodes } from 'http-status-codes';

class TeamsController {
  teamService = new TeamService();

  public getAll = async (_req: Request, res: Response) => {
    const teams = await this.teamService.getAll();
    res.status(StatusCodes.OK).json(teams);
  };

  public getById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const team = await this.teamService.getById(id);

    if (!team) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Team not found!'
      });
    }

    res.status(StatusCodes.OK).json(team);
  }
}

export default TeamsController;
