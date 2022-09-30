import Match from '../interfaces//match.interface';
import MatchModel from '../database/models/MatchesModel';
import Teams from '../database/models/TeamModel';

class MatchService {
  model = MatchModel;

  public async getAll(): Promise<Match[]> {
    const matches = await this.model.findAll(
      {
        include: [
          { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } }
        ],
      }
    );
    return matches;
  }

  public async create(match: Match): Promise<Match | any> {
    match.inProgress = true; // a partida deve ser salva como 'inProgress' = true
    const createdMatch = await this.model.create(match);

    return createdMatch;
  }

  public async partialUpdate(id: number) {
    const matchFound = await this.model.findByPk(id);

    if (matchFound !== null) {
      const inProgress = false;
      await this.model.update({ inProgress }, { where: { id } })
      return true;
    } else {
      return false;
    }
  }
}

export default MatchService;
