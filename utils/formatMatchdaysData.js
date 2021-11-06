const chunk = require("lodash.chunk");
const compact = require("lodash.compact");

module.exports.default = function formatMatchdaysData(matchdayData) {
    const allMatchdays = chunk(compact(matchdayData.split(/\r?\n/)), 3);
    const formattedData = {};
  
    allMatchdays.forEach((matchday, matchdayIndex) => {
      // for each array within the array
      // create a new matchday<number> key on matchdays
      // the value of each matchday<number> key will be an object
      // the values in the matchday<number> object
      // where the keys are <teamName> and the values are <totalPoints, inclusive of all previous match points>
      formattedData[matchdayIndex + 1] = {};
      const scoreRegex = /(\d+)/;
  
      matchday.forEach((match) => {
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
  }
  