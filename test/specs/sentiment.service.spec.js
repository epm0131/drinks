(function() {
  'use strict';

  var expect = chai.expect;

  describe('Sentiment Calculator', function() {

    var SentimentService;
    var $httpBackend;
    var $rootScope;

    beforeEach(module('drink'));

    beforeEach(inject(function(_$rootScope_, _$httpBackend_, _SentimentService_){
      SentimentService = _SentimentService_;
      $httpBackend = _$httpBackend_;
      $rootScope = _$rootScope_;

      $httpBackend
        .whenGET('/sentiment?feeling=happy')
        .respond({
          sentiment: 1
        });

      $httpBackend
        .whenGET('views/home.template.html')
        .respond('what what??');
    }));

    it('should give a numeric value in response to how you feel', function(doneCallBack){
      var result = SentimentService.analyzeSentiment('happy');
      expect(result).to.be.an('object');
      expect(result.then).to.be.a('function');
      expect(result.catch).to.be.a('function');

      result
        .then(function(data) {
          expect(data).to.be.a('number');
          doneCallBack();
        })
        .catch(function(err) {
          console.log('err msg', err.message);
          doneCallBack('inside catch of analyze sentiment (which I should not get into)');
        });
        $httpBackend.flush();
    });

    it('should fail if a string is not passed as value', function() {
      var failedAttempt = SentimentService.analyzeSentiment(123);
      expect(failedAttempt).to.be.an('object');
      expect(failedAttempt.then).to.be.a('function');
      expect(failedAttempt.catch).to.be.a('function');
    });

    it('should fail if a string is not passed as value', function() {
      var failedAttempt = SentimentService.analyzeSentiment();
      expect(failedAttempt).to.be.an('object');
      expect(failedAttempt.then).to.be.a('function');
      expect(failedAttempt.catch).to.be.a('function');
    });
  });
}());
