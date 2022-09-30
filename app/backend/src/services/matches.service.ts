import Match from '../interfaces/match.interface';
import MatchModel from '../database/models/MatchesModel';
import Teams from '../database/models/TeamModel';
import TeamModel from '../database/models/TeamModel';
const { Op } = require('sequelize');

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

  // public async checkRegisterTeam(idTeam: number) {
  //   const foundTeam = await this.teamModel.findOne({
  //     where: {
  //       [Op.or]: [
  //         { homeTeam: { [Op.equal]: idTeam } },
  //         { awayTeam: { [Op.equal]: idTeam } },
  //       ],
  //     }
  //   })
  // }

  public async create(match: Match) {
    if (match.awayTeam === match.homeTeam) {
      return 401
    }

    match.inProgress = true; // a partida deve ser salva como 'inProgress' = true
    const createdMatch = await this.matchModel.create(match);

    return createdMatch;
  }

  public async partialUpdate(id: number) {
    const matchFound = await this.matchModel.findByPk(id);

    if (matchFound !== null) {
      const inProgress = false;
      await this.matchModel.update({ inProgress }, { where: { id } })
      return true;
    } else {
      return false;
    }
  }
}

export default MatchService;
