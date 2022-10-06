const queryLeaderBoardAway = `
SELECT
    t.team_name as name,
    SUM(
    CASE
        WHEN away_team_goals > home_team_goals THEN 3
        WHEN home_team_goals = away_team_goals THEN 1
        ELSE 0
    END
    ) as totalPoints,
    COUNT(away_team) as totalGames,
    SUM(CASE WHEN away_team_goals > home_team_goals THEN 1 ELSE 0 END) as totalVictories,
    SUM(CASE WHEN away_team_goals = home_team_goals THEN 1 ELSE 0 END) as totalDraws,
    SUM(CASE WHEN away_team_goals < home_team_goals THEN 1 ELSE 0 END) as totalLosses,
    SUM(away_team_goals) AS goalsFavor,
    SUM(home_team_goals) AS goalsOwn,
    SUM(away_team_goals) - SUM(home_team_goals) as goalsBalance,
    ROUND(
        (SUM(
            CASE
                WHEN away_team_goals > home_team_goals THEN 3
                WHEN home_team_goals = away_team_goals THEN 1
                
                ELSE 0
            END
        ) / (COUNT(away_team) * 3) * 100), 2
    ) as efficiency
FROM matches AS m
    INNER JOIN teams as t ON m.away_team = t.id
WHERE in_progress = 0
GROUP BY away_team
ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;
`

export default queryLeaderBoardAway;