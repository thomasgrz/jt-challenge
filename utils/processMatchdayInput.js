const formatMatchdaysData = require("./formatMatchdaysData").default
const createMatchdayOutput = require("./createMatchdayOutput").default

module.exports.default = function processMatchdayInput(input) {
  const data = String(input);

  if (data && data != "null") {
    const matchdaysData = formatMatchdaysData(data);

    for (const [matchdayNumber, teamsData] of Object.entries(matchdaysData)) {
      const matchdayOutput = createMatchdayOutput(matchdayNumber, teamsData);
      process.stdout.write(matchdayOutput);
    }
  }
}