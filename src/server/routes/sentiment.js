var express = require('express');
var sentiment = require('../model/sentiment.js');
var router = express.Router();

router.get('/', function grabKey(req, res) {
  sentiment.getKey(function dataRetrieved(err, data) {
    if(err) {
      console.log(err);
      return;
    }
    res.json(data);
  });
});

module.exports = router;
