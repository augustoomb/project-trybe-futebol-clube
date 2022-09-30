import Team from '../interfaces/team.interface';
import TeamModel from '../database/models/TeamModel';

class TeamService {
  model = TeamModel;

  public async getAll(): Promise<Team[]> {
    const teams = await this.model.findAll();
    return teams;
  }
}

export default TeamService;
