const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    } else {
      const ip = JSON.parse(body).ip;
      return callback(error, ip);
    }
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      return callback(Error(msg), null);
    } else {
      const latitude = JSON.parse(body).latitude;
      const longitude = JSON.parse(body).longitude;
      const ip = `latitude: ${latitude}, longitude: ${longitude}`;
      return callback(null, ip);
    }
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `http://api.open-notify.rg/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching pass times: ${body}`;
      return callback(Error(msg), null);
    } else {
      let passing = JSON.parse(body).response;
      return callback(null, passing);
    }
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };