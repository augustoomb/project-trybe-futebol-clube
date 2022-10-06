import sequelize = require('sequelize');
import queryLeaderBoardHome from '../queries/queryLeaderBoardHome';
import LeaderboardModel from '../database/models/LeaderboardModel';
import MatchesModel from '../database/models/MatchesModel';

class LeaderboardService {
  matchModel = MatchesModel;

  public async getLeaderboardHome() {
    const resultQuery = await this.matchModel.sequelize?.query(queryLeaderBoardHome);
    const [result] = resultQuery as unknown[];
    const arrLeaderboard = result as LeaderboardModel[];
    // const placaresComparados = this.compareArrGoals(arrLeaderboard);
    // const completeArr = this.removeUnnecessaryFields(placaresComparados);
    // const sortedArr = this.sortingArray(completeArr);
    return arrLeaderboard;
    // const resultQuery = await this.matchModel.sequelize?.query(`
    // SELECT home_team AS idTeam, 
    // (SELECT TRYBE_FUTEBOL_CLUBE.teams.team_name FROM TRYBE_FUTEBOL_CLUBE.matches
    // INNER JOIN TRYBE_FUTEBOL_CLUBE.teams
    // ON TRYBE_FUTEBOL_CLUBE.matches.id = TRYBE_FUTEBOL_CLUBE.teams.id
    // where TRYBE_FUTEBOL_CLUBE.teams.id = idTeam) AS name, 
    // SUM(home_team_goals) AS goalsFavor,
    // SUM(away_team_goals) AS goalsOwn,
    // COUNT(home_team) AS totalGames,
    // JSON_ARRAYAGG(home_team_goals) AS arrHomeTeamsGoals,
    // JSON_ARRAYAGG(away_team_goals) AS arrAwayTeamsGoals
    // FROM TRYBE_FUTEBOL_CLUBE.matches
    // WHERE TRYBE_FUTEBOL_CLUBE.matches.in_progress = 0
    // GROUP BY home_team;
    // `);
    // const [result] = resultQuery as unknown[];
    // const arrLeaderboard = result as LeaderboardModel[];
    // const placaresComparados = this.compareArrGoals(arrLeaderboard);
    // const completeArr = this.removeUnnecessaryFields(placaresComparados);
    // const sortedArr = this.sortingArray(completeArr);
    // return sortedArr;
  }

  // // para cada time (uma posição no arr), vou comparar os arrHomeTeamsGoals e arrAwayTeamsGoals
  // public compareArrGoals(arrLeaderboardModel: LeaderboardModel[]) {
  //   arrLeaderboardModel.map((itemLeaderboard) => {
  //     let totalVictories = 0;
  //     let totalDraws = 0;
  //     let totalLosses = 0;
  //     let totalPoints = 0;
  //     let goalsBalance = 0;
  //     let efficiency = 0;

  //     if (itemLeaderboard.arrHomeTeamsGoals !== undefined && itemLeaderboard.arrAwayTeamsGoals !== undefined) {
  //       const result0 = itemLeaderboard.arrHomeTeamsGoals[0] - itemLeaderboard.arrAwayTeamsGoals[0];
  //       if (result0 == 0) {
  //         totalDraws = totalDraws + 1;
  //       } else if (result0 > 0) {
  //         totalVictories = totalVictories + 1;
  //       } else {
  //         totalLosses = totalLosses + 1;
  //       }
  //       const result1 = itemLeaderboard.arrHomeTeamsGoals[1] - itemLeaderboard.arrAwayTeamsGoals[1];
  //       if (result1 == 0) {
  //         totalDraws = totalDraws + 1;
  //       } else if (result1 > 0) {
  //         totalVictories = totalVictories + 1;
  //       } else {
  //         totalLosses = totalLosses + 1;
  //       }
  //       if (itemLeaderboard.arrHomeTeamsGoals.length === 3 && itemLeaderboard.arrAwayTeamsGoals.length === 3) {
  //         const result2 = itemLeaderboard.arrHomeTeamsGoals[2] - itemLeaderboard.arrAwayTeamsGoals[2];
  //         if (result2 == 0) {
  //           totalDraws = totalDraws + 1;
  //         } else if (result2 > 0) {
  //           totalVictories = totalVictories + 1;
  //         } else {
  //           totalLosses = totalLosses + 1;
  //         }
  //       }
  //     }

  //     totalPoints = (totalVictories * 3) + totalDraws;

  //     goalsBalance = Number(itemLeaderboard.goalsFavor || 0) - Number(itemLeaderboard.goalsOwn || 0)

  //     efficiency = totalPoints / ((itemLeaderboard.totalGames || 0) * 3) * 100

  //     itemLeaderboard.totalVictories = totalVictories;
  //     itemLeaderboard.totalDraws = totalDraws;
  //     itemLeaderboard.totalLosses = totalLosses;
  //     itemLeaderboard.totalPoints = totalPoints;
  //     itemLeaderboard.goalsBalance = goalsBalance;
  //     itemLeaderboard.efficiency = efficiency.toFixed(2) + '';

  //     itemLeaderboard.goalsOwn = Number(itemLeaderboard.goalsOwn);
  //     itemLeaderboard.goalsFavor = Number(itemLeaderboard.goalsFavor);
  //   })

  //   return arrLeaderboardModel;
  // }

  // public removeUnnecessaryFields(arr: LeaderboardModel[]) {
  //   arr.map((item: LeaderboardModel) => {
  //     delete item.idTeam;
  //     delete item.arrHomeTeamsGoals;
  //     delete item.arrAwayTeamsGoals;
  //   })

  //   return arr;
  // }

  // public sortingArray(arr: LeaderboardModel[]) {
  //   arr.sort((a, b) => {
  //     if ((b.totalPoints || 0) < (a.totalPoints || 0)) {
  //       return -1;
  //     } else if ((b.totalPoints || 0) > (a.totalPoints || 0)) {
  //       return 1;
  //     } else {
  //       if ((b.totalVictories || 0) < (a.totalVictories || 0)) {
  //         return -1;
  //       } else if ((b.totalVictories || 0) > (a.totalVictories || 0)) {
  //         return 1;
  //       } else {
  //         if ((b.goalsBalance || 0) < (a.goalsBalance || 0)) {
  //           return -1;
  //         } else if ((b.goalsBalance || 0) > (a.goalsBalance || 0)) {
  //           return 1;
  //         } else {
  //           if ((b.goalsFavor || 0) < (a.goalsFavor || 0)) {
  //             return -1;
  //           } else if ((b.goalsFavor || 0) > (a.goalsFavor || 0)) {
  //             return 1;
  //           } else {
  //             if ((b.goalsFavor || 0) < (a.goalsFavor || 0)) {
  //               return -1;
  //             } else {
  //               return 1;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   });

  //   return arr;
  // }
}

export default LeaderboardService;




// query (1ª tentativa):

/* 

SELECT home_team AS idTeam, 
    (SELECT TRYBE_FUTEBOL_CLUBE.teams.team_name FROM TRYBE_FUTEBOL_CLUBE.matches
    INNER JOIN TRYBE_FUTEBOL_CLUBE.teams
    ON TRYBE_FUTEBOL_CLUBE.matches.id = TRYBE_FUTEBOL_CLUBE.teams.id
    where TRYBE_FUTEBOL_CLUBE.teams.id = idTeam) AS name, 
    SUM(home_team_goals) AS goalsFavor,
    SUM(away_team_goals) AS goalsOwn,
    COUNT(home_team) AS totalGames,
    JSON_ARRAYAGG(home_team_goals) AS arrHomeTeamsGoals,
    JSON_ARRAYAGG(away_team_goals) AS arrAwayTeamsGoals,
    
    (
    CASE 
        WHEN JSON_EXTRACT((JSON_ARRAYAGG(home_team_goals)), '$[0]') > JSON_EXTRACT((JSON_ARRAYAGG(away_team_goals)), '$[0]') THEN 3
        WHEN JSON_EXTRACT((JSON_ARRAYAGG(home_team_goals)), '$[0]') < JSON_EXTRACT((JSON_ARRAYAGG(away_team_goals)), '$[0]') THEN 0
        ELSE 1
    END) AS result1,
    
    (
    CASE 
        WHEN JSON_EXTRACT((JSON_ARRAYAGG(home_team_goals)), '$[1]') > JSON_EXTRACT((JSON_ARRAYAGG(away_team_goals)), '$[1]') THEN 3
        WHEN JSON_EXTRACT((JSON_ARRAYAGG(home_team_goals)), '$[1]') < JSON_EXTRACT((JSON_ARRAYAGG(away_team_goals)), '$[1]') THEN 0
        ELSE 1
    END) AS result2,
    
    (
    CASE 
        WHEN JSON_EXTRACT((JSON_ARRAYAGG(home_team_goals)), '$[2]') > JSON_EXTRACT((JSON_ARRAYAGG(away_team_goals)), '$[2]') THEN 3
        WHEN JSON_EXTRACT((JSON_ARRAYAGG(home_team_goals)), '$[2]') < JSON_EXTRACT((JSON_ARRAYAGG(away_team_goals)), '$[2]') THEN 0
        ELSE 1
    END) AS result3,
    
    (
    (CASE 
      WHEN JSON_EXTRACT((JSON_ARRAYAGG(home_team_goals)), '$[0]') > JSON_EXTRACT((JSON_ARRAYAGG(away_team_goals)), '$[0]') THEN 3
      WHEN JSON_EXTRACT((JSON_ARRAYAGG(home_team_goals)), '$[0]') < JSON_EXTRACT((JSON_ARRAYAGG(away_team_goals)), '$[0]') THEN 0
      ELSE 1
    END)    
    +
    (CASE 
      WHEN JSON_EXTRACT((JSON_ARRAYAGG(home_team_goals)), '$[1]') > JSON_EXTRACT((JSON_ARRAYAGG(away_team_goals)), '$[1]') THEN 3
      WHEN JSON_EXTRACT((JSON_ARRAYAGG(home_team_goals)), '$[1]') < JSON_EXTRACT((JSON_ARRAYAGG(away_team_goals)), '$[1]') THEN 0
      ELSE 1
    END)  
        
  +	
    (CASE 
      WHEN JSON_EXTRACT((JSON_ARRAYAGG(home_team_goals)), '$[2]') > JSON_EXTRACT((JSON_ARRAYAGG(away_team_goals)), '$[2]') THEN 3
      WHEN JSON_EXTRACT((JSON_ARRAYAGG(home_team_goals)), '$[2]') < JSON_EXTRACT((JSON_ARRAYAGG(away_team_goals)), '$[2]') THEN 0
      ELSE 1
    END)  
    ) AS points
    
    FROM TRYBE_FUTEBOL_CLUBE.matches
    WHERE TRYBE_FUTEBOL_CLUBE.matches.in_progress = 0
    GROUP BY home_team;

*/