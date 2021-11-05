#!/usr/bin/env node
const fs = require('fs')
const readStream = fs.createReadStream('./sample-input.txt');
const chunk = require('lodash.chunk') 
const compact = require('lodash.compact') 

readStream.on('readable', () => {
    // read in the file data
    const input = readStream.read()
    // convert file data to a string
    // split the data up by the newline character
    // const matches = String(data).split(/\r?\n/)
    const data = String(input)
    if(data && data != "null"){
        // const matchesDays = chunk(data.split(/\r?\n/),3)
        const matches = chunk(compact(data.split(/\r?\n/)),3);
        console.log(matches)

        // how points work:
        // if a team ties they each get 1 point
        // if a team wins they get 3 points
        // if a team loses they get 0 points

        // creat an object matchDays
        const matchDays = {}
        // iterate over the array of matches
        matches.forEach((matchDay, matchDayIndex) =>{
            // for each array within the array
            // create a new matchDay<number> key 
            // the value of each matchDay<number> key will be an array
            // the values in the matchDay<number> array should be strings
            // each string should be formatted like <teamName>:<totalPoints>
            // const teamsWithPoints = 
            matchDays[matchDayIndex + 1] = {}
            const scoreRegex = /(\d+)/

            matchDay.forEach(match => {
                const [team1Data, team2Data] = match.split(',')
                const [team1Score, team2Score] = [team1Data.match(scoreRegex)[0], team2Data.match(scoreRegex)[0]]
                const team1Name = team1Data.replace(scoreRegex, '').trim()
                const team2Name = team2Data.replace(scoreRegex, '').trim()

                let team1Points = 0
                let team2Points = 0

                if(team1Score>team2Score){
                    team1Points = 3
                } else if (team1Score === team2Score) {
                    team1Points = 1
                    team2Points = 1
                } else {
                    team2Points = 3
                }

                if(matchDayIndex) {
                     team1Points += matchDays[matchDayIndex][team1Name]
                     team2Points += matchDays[matchDayIndex][team2Name]
                }

                matchDays[matchDayIndex + 1][team1Name] = team1Points
                matchDays[matchDayIndex + 1][team2Name] = team2Points
            })
        })

        console.log(matchDays)
       
        
        // how sorting the teams works:
        // - first, by amount of points
        // - then, by alphabetical (in case of a tie)

        // how data should be ouput:
        // there should be 4 lines of text for each match day
        // the first line of text is the title in the form of "Matchday <number>"
        // the 2nd through 4th lines each contain a team name in order of points (greatest to least)
        // and each team name should be followed by a space and then their total points that matchday
        // there should be an additional newline between each four line matchday output block

    }

  });
  readStream.on('end', () => {
    console.log('end');
  });
