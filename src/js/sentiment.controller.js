(function() {
  'use strict';

  angular.module('drink')
    .controller('SentimentController', SentimentController);

    SentimentController.$inject = [ '$q', 'SentimentService', 'DrinkService' ];

    function SentimentController( $q, SentimentService, DrinkService ) {

      var vm = this;
      this.happyArray = ["console.log('Cheers!!!')", 'Glad you are having a great day!', 'Drinks on the house!' ];
      this.sadArray = ['Sorry you are having a bad day.', 'Drink up!', 'This should cheer you up!', "console.log('Lets forget this day!!!')"];
      this.sentiment = '';
      this.sentimentValue = null;
      this.drink = {};
      this.dailyMessage = '';
      this.displayDrinkDetails = false;
      /**
       * Will given a string this will calculate a sentiment based on what words
       * are passed into this funciton.
       * @param  {string} sentiment some kind of expression about how you feel
       */
      this.calculateSentiment = function calculateSentiment(sentiment) {
        if(typeof(sentiment) !== 'string') {
          return $q.reject('oopps!!');
        }
        return SentimentService.analyzeSentiment(sentiment)
          .then(function successHandler(data){
            if(data < 0) {
              vm.dailyMessage = vm.randomMessage('sad');
            } else {
              vm.dailyMessage = vm.randomMessage('happy');
            }
            vm.sentimentValue = data;
            return DrinkService.getRandomDrink()
              .then(function (drink) {
                vm.drink = drink;
                vm.displayDrinkDetails = true;
                return data;
              });
          })
          .catch(function failHandler(xhr){
            console.log(xhr);
          });
      };
      /**
       *This functions allows my analyzeSentiment to be able to grab a message
       *that is either happy or sad.
       * @param  {string} mood is happy or sad
       * @return {string}      a description of your mood
       */
      this.randomMessage = function randomMessage(mood){
        var random = Math.floor(Math.random()*4);
        if(mood === 'happy'){
          return this.happyArray[random];
        } else if(mood === 'sad') {
          return this.sadArray[random];
        }
      };
    }

}());
