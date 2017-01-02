(function() {
  'use strict';

  angular.module('drink')
    .controller('SentimentController', SentimentController);

    SentimentController.$inject = [ 'SentimentService' ];

    function SentimentController( SentimentService ) {

      var vm = this;
      this.sentiment = '';

      this.calculateSentiment = function calculateSentiment(sentiment) {
        if(typeof(sentiment) !== 'string') {
          return;
        }
        SentimentService.analyzeSentiment(sentiment)
          .then(function successHandler(data){
            vm.sentiment = data;
          })
          .catch(function failHandler(xhr){
            console.log(xhr);
          });
      };

    }

}());
