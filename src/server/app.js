'use strict';

var express = require('express');
var server = express();
var bodyParser = require('body-parser');

server.set('port', process.env.PORT || 3000);
server.use(bodyParser.json());
server.use(express.static('build/'));

server.use('/sentiment', require('./routes/sentiment'));

server.listen(server.get('port'), function startedServer(err) {
    if (err) {
        console.error(err);
    } else {
        console.log('Server starting on http://localhost:' + server.get('port'));
    }
});
