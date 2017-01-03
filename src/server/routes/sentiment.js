'use strict';

var express = require('express');
var sentiment = require('../model/sentiment.js');
var Language = require('@google-cloud/language');
var router = express.Router();

router.get('/', function grabKey(req, res) {
  var key = sentiment.getKey();

  var languageAnalyzer = Language({
    projectId: key.project_id,
    credentials: key,
  });

  console.log(req);

  var document = languageAnalyzer.document(req.query.feeling);

  document.detectSentiment(function(err, sentiment){
    if(err){
      console.log(err);
      res.status(500).send('Oops something went wrong');
      return;
    }
    res.json({
      sentiment: sentiment
    });
  });

});

module.exports = router;
