var googleCreds = JSON.parse(process.env.DRINKS_GOOGLE_CREDENTIALS);
console.log(googleCreds.project_id);
var express = require('express');
var server = express();
var bodyParser = require('body-parser');

server.set('port', process.env.PORT || 3000);
server.use(bodyParser.json());
server.use(express.static('build/'));

server.use('/sentiment', require('./routes/sentiment'));

server.listen(server.get('port'), function startedServer(err) {
  console.log('sup brah');
    if (err) {
        console.error(err);
    } else {
        console.log('Server starting on http://localhost:' + server.get('port'));
    }
});
