import sequelize = require('sequelize');
import queryLeaderBoardHome from '../queries/queryLeaderBoardHome';
import queryLeaderBoardAway from '../queries/queryLeaderBoardAway';
import LeaderboardModel from '../database/models/LeaderboardModel';
import MatchesModel from '../database/models/MatchesModel';

class LeaderboardService {
  matchModel = MatchesModel;

  public async getLeaderboardHome() {
    const resultQuery = await this.matchModel.sequelize?.query(queryLeaderBoardHome);
    const [result] = resultQuery as unknown[];
    const arrLeaderboard = result as LeaderboardModel[];
    return arrLeaderboard;
  }

  public async getLeaderboardAway() {
    const resultQuery = await this.matchModel.sequelize?.query(queryLeaderBoardAway);
    const [result] = resultQuery as unknown[];
    const arrLeaderboard = result as LeaderboardModel[];
    return arrLeaderboard;
  }
}

export default LeaderboardService;
