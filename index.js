const { fetchISSFlyOverTimes } = require('./iss');

fetchISSFlyOverTimes({ latitude: '49.2825', longitude: '-123.1291' }, (error, coordinates) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log('It worked! Returned flyover times:', coordinates);
});

