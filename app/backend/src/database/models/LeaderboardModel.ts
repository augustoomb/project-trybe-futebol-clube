import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './TeamModel';
// import OtherModel from './OtherModel';

class LeaderboardModel extends Model {
  public idTeam?: number; // remover antes de devolver na API
  public name?: number;
  public totalPoints?: number;
  public totalGames?: number;
  public totalVictories?: number;
  public totalDraws?: number;
  public totalLosses?: number;
  public goalsFavor?: number;
  public goalsOwn?: number;
  public goalsBalance?: number;
  public efficiency?: string;
  public arrHomeTeamsGoals?: number[]; // remover antes de devolver na API
  public arrAwayTeamsGoals?: number[]; // remover antes de devolver na API
}



// Matches.init({
//   id: {
//     type: INTEGER,
//     allowNull: false,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   homeTeam: {
//     type: INTEGER,
//   },
//   homeTeamGoals: {
//     type: INTEGER,
//   },
//   awayTeam: {
//     type: INTEGER,
//   },
//   awayTeamGoals: {
//     type: INTEGER,
//   },
//   inProgress: {
//     type: BOOLEAN,
//   },
// }, {
//   // ... Outras configs
//   underscored: true,
//   sequelize: db,
//   modelName: 'matches',
//   timestamps: false,
// });

/**
  * `Workaround` para aplicar as associations em TS: 
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'teamHome' });
// Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'teamAway' });

// Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
// Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });

export default LeaderboardModel;
