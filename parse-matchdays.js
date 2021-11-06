#!/usr/bin/env node
const fs = require("fs");
const processMatchdayInput = require("./utils/processMatchdayInput").default
const { ERR_NO_PATH_PRESENT } = require("./utils/constants")

const main = () => {
  try {
    if (process.stdin.isTTY) {
      // handle when filepath is passed as argument
      const [, , filepath] = process.argv;
  
      if (!filepath) {
        process.stdout.write(ERR_NO_PATH_PRESENT);
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
  
}

main()

module.exports.default = main