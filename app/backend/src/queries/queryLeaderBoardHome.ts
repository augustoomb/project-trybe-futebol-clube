const queryLeaderBoardHome = `
SELECT
    home_team as teamID,
    t.team_name as name,
    SUM(
    CASE
        WHEN home_team_goals > away_team_goals THEN 3
        WHEN home_team_goals = away_team_goals THEN 1
        ELSE 0
    END
    ) as totalPoints,
    COUNT(home_team) as totalGames,
    SUM(CASE WHEN home_team_goals > away_team_goals THEN 1 ELSE 0 END) as totalVictories,
    SUM(CASE WHEN home_team_goals = away_team_goals THEN 1 ELSE 0 END) as totalDraws,
    SUM(CASE WHEN home_team_goals < away_team_goals THEN 1 ELSE 0 END) as totalLosses,
    SUM(home_team_goals) AS goalsFavor,
    SUM(away_team_goals) AS goalsOwn,
    SUM(home_team_goals) - SUM(away_team_goals) as goalsBalance,
    ROUND(
        (SUM(
            CASE
                WHEN home_team_goals > away_team_goals THEN 3
                WHEN home_team_goals = away_team_goals THEN 1
                
                ELSE 0
            END
        ) / (COUNT(home_team) * 3) * 100), 2
    ) as efficiency
FROM matches AS m
    INNER JOIN teams as t ON m.home_team = t.id
WHERE in_progress = 0
GROUP BY home_team
ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;
`

export default queryLeaderBoardHome;