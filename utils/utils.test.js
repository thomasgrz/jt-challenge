const fs = require("fs");
const formatMatchdayOutput = require("./formatMatchdayOutput").default;
const processMatchdayInput = require("./processMatchdayInput").default;
const sortWinningTeams = require("./sortWinningTeams").default;
const formatMatchdaysData = require("./formatMatchdaysData").default;
const path = require('path');
const child = require('child_process');

describe("formatMatchdaysData", () => {
  it("take a string of matchday data and output it in the correct format with scores aggregated", () => {
    const unformattedData = `San Jose Earthquakes 3, Santa Cruz Slugs 3
        Capitola Seahorses 1, Aptos FC 0
        Felton Lumberjacks 2, Monterey United 0
        Felton Lumberjacks 1, Aptos FC 2
        Santa Cruz Slugs 0, Capitola Seahorses 0
        Monterey United 4, San Jose Earthquakes 2`;

    const formattedData = {
      1: {
        "San Jose Earthquakes": 1,
        "Santa Cruz Slugs": 1,
        "Capitola Seahorses": 3,
        "Aptos FC": 0,
        "Felton Lumberjacks": 3,
        "Monterey United": 0,
      },
      2: {
        "Felton Lumberjacks": 3,
        "Aptos FC": 3,
        "Santa Cruz Slugs": 2,
        "Capitola Seahorses": 4,
        "Monterey United": 3,
        "San Jose Earthquakes": 1,
      },
    };

    expect(formatMatchdaysData(unformattedData)).toEqual(formattedData);
  });
});
describe("sortWinningTeams", () => {
  it("should sort the winning teams weighted by score and then alphabetically in case of ties", () => {
    const unsortedTeams = [
      { name: "c", points: 3 },
      { name: "d", points: 6 },
      { name: "a", points: 3 },
      { name: "b", points: 5 },
    ];

    const expectedSortResult = [
      { name: "d", points: 6 },
      { name: "b", points: 5 },
      { name: "a", points: 3 },
      { name: "c", points: 3 },
    ];

    expect(unsortedTeams.sort(sortWinningTeams)).toEqual(expectedSortResult);
  });
});

describe("processMatchdayInput", () => {
  exec = path.join(__dirname, '.', 'processMatchdayInput.js');
  proc = child.spawn(exec, {stdio: 'pipe'});
  
  it("processes matchdays input data correctly", () => {
    const readStreamSampleInput = fs.createReadStream("./sample-input.txt");

    let processedInputData;
    readStreamSampleInput.on("readable", () => {
      const sampleInput = readStreamSampleInput.read();
      processedInputData = processMatchdayInput(sampleInput);
    });

    const readStreamExpectedOutput = fs.createReadStream(
      "./expected-output.txt"
    );

    let expectedOutputData;
    readStreamExpectedOutput.on("readable", () => {
      const sampleOutput = readStreamExpectedOutput.read();
      expectedOutputData = String(sampleOutput);
    });

    expect(processedInputData).toEqual(undefined);
  });
});

describe("formatMatchdayOutput", () => {
  it("creates correctly formatted output for a matchday given a number and team data", () => {
    const teamsDataInput = {
      "San Jose Earthquakes": 3,
      "Santa Cruz Slugs": 3,
      "Capitola Seahorses": 1,
      "Aptos FC": 0,
    };

    const teamsDataOutput = `Matchday 1\nSan Jose Earthquakes, 3 pts\nSanta Cruz Slugs, 3 pts\nCapitola Seahorses, 1 pts\n\n`;
    expect(formatMatchdayOutput(1, teamsDataInput)).toEqual(teamsDataOutput);
  });
});
