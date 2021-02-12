const { nextISSTimesForMyLocation } = require('./iss');

const addTimes = passTimes => {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const time = pass.duration;
    console.log(`Next pass at ${datetime} for ${time} seconds!`);
  }
};


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  addTimes(passTimes);
});

















// fetchISSFlyOverTimes({ latitude: '49.2825', longitude: '-123.1291' }, (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('It worked! Returned flyover times:', coordinates);
// });

