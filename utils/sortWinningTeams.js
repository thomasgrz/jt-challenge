module.exports.default = function sortWinningTeams(team1, team2) {
    // how sorting the teams works:
    // - first, by amount of points
    // - then, by alphabetical (in case of a tie)
    if (team1.points === team2.points) {
      return team2.name - team1.name;
    }
    return team1.points < team2.points ? 1 : -1;
  }
  