const sortWinningTeams = require("./sortWinningTeams").default

module.exports.default = function createMatchdayOutput(matchdayNumber, teamsData) {
    const top3TeamsSorted = Object.entries(teamsData)
      .map((team) => {
        const [name, points] = team;
        return { name, points };
      })
      .sort(sortWinningTeams)
      .slice(0, 3);
  
    let output = `Matchday ${matchdayNumber}\n`;
  
    top3TeamsSorted.forEach((team) => {
      output += `${team.name}, ${team.points} pts\n`;
    });
  
    output += "\n";
    return output;
  }