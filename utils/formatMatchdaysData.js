const chunk = require("lodash.chunk");
const compact = require("lodash.compact");

/**
 * Takes a matchdayData string and transforms it
 * into an object where each key of that object is a number (>=1)
 * which correlates to the matchday.
 * The value at each key is another object where each key
 * is a team name and the value at that key is a number
 * representing their accumulated points as of that day (inclusive)
 *
 * @param {string} matchdayData
 * @returns {object}
 * Example object:
 * {
 *   1: {
 *        "San Jose Earthquakes": 3,
 *       " Capitola Seahorses": 1,
 *        Felton Lumberjacks 4,
 *        ...
 *      },
 *   2: {
 *        "San Jose Earthquakes": 6,
 *        "Capitola Seahorses": 1,
 *        "Felton Lumberjacks": 7,
 *        ...
 *      }
 * ...
 * }
 */
module.exports.default = function formatMatchdaysData(matchdayData) {
  const allMatchdays = chunk(compact(matchdayData.split(/\r?\n/)), 3);
  const formattedData = {};

  allMatchdays.forEach((matchday, matchdayIndex) => {
    formattedData[matchdayIndex + 1] = {};
    const scoreRegex = /(\d+)/;

    matchday.forEach((match) => {
      // TODO: break this scoring functionality out in separate module that can be unit tested
      const [team1Data, team2Data] = match.split(",");
      const [team1Score, team2Score] = [
        team1Data.match(scoreRegex)[0],
        team2Data.match(scoreRegex)[0],
      ];
      const team1Name = team1Data.replace(scoreRegex, "").trim();
      const team2Name = team2Data.replace(scoreRegex, "").trim();

      // how points work:
      // if a team ties they each get 1 point
      // if a team wins they get 3 points
      // if a team loses they get 0 points
      let team1Points = 0;
      let team2Points = 0;

      if (team1Score > team2Score) {
        team1Points = 3;
      } else if (team1Score === team2Score) {
        team1Points = 1;
        team2Points = 1;
      } else {
        team2Points = 3;
      }

      if (matchdayIndex) {
        team1Points += formattedData[matchdayIndex][team1Name];
        team2Points += formattedData[matchdayIndex][team2Name];
      }

      formattedData[matchdayIndex + 1][team1Name] = team1Points;
      formattedData[matchdayIndex + 1][team2Name] = team2Points;
    });
  });

  return formattedData;
};
