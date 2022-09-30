import Team from '../interfaces/team.interface';
import TeamModel from '../database/models/TeamModel';

class TeamService {
  model = TeamModel;

  public async getAll(): Promise<Team[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  public async getById(id: number): Promise<Team | null> {
    const team = await this.model.findByPk(id);
    return team;
  }
}

export default TeamService;
