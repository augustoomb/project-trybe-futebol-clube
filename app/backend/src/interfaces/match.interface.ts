interface Match {
  id?: number,
  homeTeam: number
  homeTeamGoals: number
  awayTeam: number,
  awayTeamGoals: number,
  inProgress?: boolean,
}

export default Match;
