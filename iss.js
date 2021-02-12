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
    }
    const latitude = JSON.parse(body).latitude;
    const longitude = JSON.parse(body).longitude;
    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function(coordinates, callback) {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coordinates.latitude}&lon=${coordinates.longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching pass times: ${body}`;
      return callback(Error(msg), null);
    }
    const passing = JSON.parse(body).response;
    callback(null, passing);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coordinates, (error, passing) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, passing);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };