#!/usr/bin/env node
const fs = require("fs");
const processMatchdayInput = require("./utils/processMatchdayInput").default

try {
  if (process.stdin.isTTY) {
    // handle when filepath is passed as argument
    const [, , filepath] = process.argv;

    if (!filepath) {
      console.error(
        "Error: please pass filepath as an argument \n\n Example: ./parse-matchday-data.js ./file/path.txt \n"
      );
      return;
    }

    const readStream = fs.createReadStream(filepath);
    readStream.on("readable", () => {
      const input = readStream.read();
      processMatchdayInput(input);
    });

    readStream.on("end", () => {
      return;
    });
  } else {
    // handle piped content
    process.stdin.on("readable", () => {
      let chunk;
      while ((chunk = process.stdin.read()) !== null) {
        processMatchdayInput(chunk);
      }
    });
  }
} catch (e) {
  console.error(e);
}


