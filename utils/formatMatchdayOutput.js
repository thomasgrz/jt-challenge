const sortWinningTeams = require("./sortWinningTeams").default;

/**
 * Create a formatted string containing a matchday title as
 * well as the top 3 teams in descending order
 * ready to be output to stdout.
 *
 *
 * @param {number} matchdayNumber - If it is the first matchday this would be "1" and so on..
 * @param {object <string, number>} - teamsData the keys are teamNames, and the values represent the score
 * as of that matchday inclusive of all previous matchdays
 *
 * Example of teamsData object below:
 * { 'San Francisco San Jose Earthquakes': 3, 'Santa Cruz Slugs': 3 , ... }
 *
 * @returns {string} Should look like:
 * "Matchday matchdayNumber>
 * team name in first place, number of points pts
 * team name in second place, number of points pts
 * team name in third place, number of points pts
 * "
 */
module.exports.default = function formatMatchdayOutput(
  matchdayNumber,
  teamsData
) {
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
};
