import Match from '../interfaces/match.interface';
import MatchModel from '../database/models/MatchesModel';
import Teams from '../database/models/TeamModel';
import TeamModel from '../database/models/TeamModel';
// const { Op } = require('sequelize');

class MatchService {
  matchModel = MatchModel;
  teamModel = TeamModel;

  public async getAll(): Promise<Match[] | undefined> {
    try {
      const matches = await this.matchModel.findAll(
        {
          include: [
            { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
            { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } }
          ],
        }
      );
      return matches;
    } catch (error) {
      const objError = error as Error;
      console.log(objError.message);
    }
  }

  // checar se ambos os ids recebidos na linha abaixo existem na tabela de teams
  private async checkTeamExists(idAwayTeam: number, idHomeTeam: number): Promise<Teams | null> {
    const checkAwayTeam = await this.teamModel.findByPk(idAwayTeam);
    const checkHomeTeam = await this.teamModel.findByPk(idHomeTeam);

    return checkAwayTeam && checkHomeTeam;
  }

  public async create(match: Match): Promise<Match | number | undefined> {
    try {
      if (match.awayTeam === match.homeTeam) {
        return 401;
      } else if (await this.checkTeamExists(match.awayTeam, match.homeTeam) === null) {
        return 404;
      } else {
        match.inProgress = true; // a partida deve ser salva como 'inProgress' = true
        const createdMatch = await this.matchModel.create(match);

        return createdMatch;
      }
    } catch (error) {
      const objError = error as Error;
      console.log(objError.message);
    }
  }

  // MARCA PARTIDA RECEBIDA COMO FINALIZADA, OU SEJA, ATRIBUI false A PROPRIEDADE inProgress
  public async markMatchAsFinished(id: number): Promise<boolean | undefined> {
    try {
      const matchFound = await this.matchModel.findByPk(id);

      if (matchFound !== null) {
        const inProgress = false;
        await this.matchModel.update({ inProgress }, { where: { id } })
        return true;
      } else {
        return false;
      }
    } catch (error) {
      const objError = error as Error;
      console.log("Entrou aqui: " + objError.message);
    }
  }

  public async updateMatchInProgress(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<boolean | undefined> {
    try {
      const matchFound = await this.matchModel.findByPk(id);

      if (matchFound === null) {
        return false;
      } else if (!matchFound.inProgress) {
        return false;
      } else {
        await this.matchModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } })
        return true;
      }
    } catch (error) {
      const objError = error as Error;
      console.log(objError.message);
    }
  }
}

export default MatchService;
