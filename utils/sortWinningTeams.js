module.exports.default = function sortWinningTeams(team1, team2) {
    // how sorting the teams works:
    // - first, by amount of points
    // - then, alphabetical (in case of a tie)
    if (team1.points === team2.points) {
      
      return team1.name.localeCompare(team2.name, 'en', { sensitivity: 'base' }) > 0 ? 1 : -1
    }
    return team1.points < team2.points ? 1 : -1;
  }
  