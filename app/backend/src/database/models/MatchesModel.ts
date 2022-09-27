import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './TeamModel';
// import OtherModel from './OtherModel';

class Matches extends Model {
  // public <campo>!: <tipo>;
  public id!: number;
  public homeTeam!: number;
  public homeTeamGoals!: number;
  public awayTeam!: number;
  public awayTeamGoals!: number;
  public inProgress!: boolean;
}

Matches.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
  },
  homeTeamGoals: {
    type: INTEGER,
  },
  awayTeam: {
    type: INTEGER,
  },
  awayTeamGoals: {
    type: INTEGER,
  },
  inProgress: {
    type: BOOLEAN,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS: 
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

Teams.belongsTo(Matches, { foreignKey: 'homeTeam', as: 'fkHomeTeam' });
Teams.belongsTo(Matches, { foreignKey: 'awayTeam', as: 'fkAwayTeam' });

Matches.hasMany(Teams, { foreignKey: 'homeTeam', as: 'fkHomeTeam' });
Matches.hasMany(Teams, { foreignKey: 'awayTeam', as: 'fkAwayTeam' });

export default Matches;
