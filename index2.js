const { nextISSTimesForMyLocation } = require('./iss_promised');
const { addTimes } = require('./index.js');

nextISSTimesForMyLocation()
  .then((passTimes) => {
    addTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
