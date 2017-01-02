  var googleCreds = JSON.parse(process.env.DRINKS_GOOGLE_CREDENTIALS);

module.exports = {
  getKey : getKey
};

function getKey(callback) {
  callback(null, googleCreds );
}
