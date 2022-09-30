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
}

export default MatchService;
