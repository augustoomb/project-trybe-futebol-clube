import Match from '../interfaces/match.interface';
import MatchModel from '../database/models/MatchesModel';
import Teams from '../database/models/TeamModel';
import TeamModel from '../database/models/TeamModel';
// const { Op } = require('sequelize');

class MatchService {
  matchModel = MatchModel;
  teamModel = TeamModel;

  public async getAll(): Promise<Match[]> {
    const matches = await this.matchModel.findAll(
      {
        include: [
          { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } }
        ],
      }
    );
    return matches;
  }

  // checar se ambos os ids recebidos na linha abaixo existem na tabela de teams
  public async checkTeamExists(idAwayTeam: number, idHomeTeam: number) {
    const teste1 = await this.teamModel.findByPk(idAwayTeam);
    const teste2 = await this.teamModel.findByPk(idHomeTeam);

    return teste1 && teste2;
  }

  public async create(match: Match) {
    if (match.awayTeam === match.homeTeam) {
      return 401;
    } else if (await this.checkTeamExists(match.awayTeam, match.homeTeam) === null) {
      return 404;
    } else {
      match.inProgress = true; // a partida deve ser salva como 'inProgress' = true
      const createdMatch = await this.matchModel.create(match);

      return createdMatch;
    }
  }

  // MARCA PARTIDA RECEBIDA COMO FINALIZADA, OU SEJA, ATRIBUI false A PROPRIEDADE inProgress
  public async markMatchAsFinished(id: number) {
    const matchFound = await this.matchModel.findByPk(id);

    if (matchFound !== null) {
      const inProgress = false;
      await this.matchModel.update({ inProgress }, { where: { id } })
      return true;
    } else {
      return false;
    }
  }

  public async updateMatchInProgress(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    const matchFound = await this.matchModel.findByPk(id);

    if (matchFound === null) {
      return false;
    } else if (!matchFound.inProgress) {
      return false;
    } else {
      await this.matchModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } })
      return true;
    }
  }
}

export default MatchService;
