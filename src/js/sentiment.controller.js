(function() {
  'use strict';

  angular.module('drink')
    .controller('SentimentController', SentimentController);

    SentimentController.$inject = [ 'SentimentService', 'DrinkService' ];

    function SentimentController( SentimentService, DrinkService ) {

      var vm = this;
      this.sentiment = '';
      this.sentimentValue = null;
      this.drink = {};
      this.dailyMessage = '';
      this.showStuff = false;
      /**
       * Will given a string this will calculate a sentiment based on what words
       * are passed into this funciton.
       * @param  {string} sentiment some kind of expression about how you feel
       */
      this.calculateSentiment = function calculateSentiment(sentiment) {
        if(typeof(sentiment) !== 'string') {
          return;
        }
        SentimentService.analyzeSentiment(sentiment)
          .then(function successHandler(data){
            if(data < 0) {
              vm.dailyMessage = 'I am sorry you are having a bad day! Drink up!!';
            } else {
              vm.dailyMessage = 'Cheers!!!!! What can I serve you';
            }
            vm.sentimentValue = data;
            DrinkService.getRandomDrink()
              .then(function (drink) {
                vm.drink = drink;
                console.log(vm.drink);
                vm.showStuff = true;
              });
          })
          .catch(function failHandler(xhr){
            console.log(xhr);
          });
      };

    }

}());
