'use strict';

var googleCreds = JSON.parse(process.env.DRINKS_GOOGLE_CREDENTIALS);

module.exports = {
  getKey : getKey
};

function getKey() {
  return googleCreds;
}
