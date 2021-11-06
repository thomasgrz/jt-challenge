const formatMatchdaysData = require("./formatMatchdaysData").default
const formatMatchdayOutput = require("./formatMatchdayOutput").default

/**
 * Consumes raw matchdays input data,
 * transforms data into a string,
 * formats the string, 
 * then outputs data to stdout
 * 
 * @param {Buffer} input 
 */
module.exports.default = function processMatchdayInput(input) {
  const data = String(input);

  if (data && data != "null") {
    const matchdaysData = formatMatchdaysData(data);

    for (const [matchdayNumber, teamsData] of Object.entries(matchdaysData)) {
      const matchdayOutput = formatMatchdayOutput(matchdayNumber, teamsData);
      process.stdout.write(matchdayOutput);
    }
  }
}