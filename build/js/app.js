(function() {
  'use strict';

  angular.module('drink', [ 'ui.router' ])
    .config(routerConfig);

  routerConfig.$inject = [ '$stateProvider', '$urlRouterProvider'];

  function routerConfig($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.when('', '/');

      $stateProvider
        .state({
          name: 'home',
          url: '/',
          templateUrl:'views/home.template.html',
          controller: 'SentimentController',
          controllerAs: 'feelings'
        });

      $stateProvider
        .state({
          name: 'list',
          url: '/drinklist',
          templateUrl: 'views/drink-list.template.html',
          controller: 'DrinkListController',
          controllerAs: 'list'
        });
  }



}());

(function() {
  'use strict';

  angular.module('drink')
    .factory('DrinkService', DrinkService);

    DrinkService.$inject = [ '$http' ];

    function DrinkService($http) {

      return {

        getOneDrink: getOneDrink,
        getAllDrinks: getAllDrinks,
        getRandomDrink: getRandomDrink,

      };
      /**
       * Get all the information about the cocktail when given name
       * I transform the response from angular to only return data in the
       * promise callback.
       * @param {string} drinkName the search string.
       * @return {promise} Ajax callback promise with transformed data.
       */
      function getOneDrink(drinkName) {
        if(typeof(drinkName) !== 'string') {
          return;
        }
        return $http({
          url: 'http://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + drinkName,
          method: 'GET'
        })
        .then(function transformDrinkResponse(response) {
          return response.data.drinks;
        });
      }
      /**
       * Get cocktail data from cocktail database.  I transform the response
       * from angular to only return data in the promise callback.
       * @return {promise} Ajax callback promise with transformed data.
       */
      function getAllDrinks() {
        return $http({
          url: 'http://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic',
          method: 'GET'
        })
        .then(function transformDrinkResponse(response) {
        var hasImage = [];
        response.data.drinks.forEach(function noImage(each) {
          if (each.strDrinkThumb) {
            hasImage.push(each);
          }
        });
        return hasImage;
      });

    }
    /**
     * Get a random cocktail from the data base and have all it's detail with it.
     * I transform the response from angular to only return data in the promise
     * callback.
     * @return {promise} Ajax callback promise with transformed data.
     */
    function getRandomDrink() {
      return $http({
        url: 'http://www.thecocktaildb.com/api/json/v1/1/random.php',
        method: 'GET'
      })
      .then(function transformDrinkResponse(response) {
        return response.data.drinks[0];
      });
    }
  }

}());

(function() {
  'use strict';

  angular.module('drink')
    .controller('DrinkListController', DrinkListController);

  DrinkListController.$inject = [ '$q', 'DrinkService' ];

  function DrinkListController( $q, DrinkService ) {
    var vm = this;
    this.drinks = [];
    this.randomDrinkArray = [];
    this.randomDrink = {};
    this.drinkName = '';
    this.drink = {};
    this.displayDrinkDetails = false;

    /**
     * When provided a name of a drink it will pull all the details associated
     * with that drink name.
     * @param  {string} drinkName the name of drink you want to look up
     * @return {Promise}
     */
    this.lookUpDrink = function lookUpDrink(drinkName){
      if(typeof(drinkName) !== 'string') {
        return $q.reject('oops');
      }
      return DrinkService.getOneDrink(drinkName)
        .then(function successHandler(data){
          vm.drink = data;
          vm.displayDrinkDetails = true;
          return data;
        })
        .catch(function failHandler(xhr) {
          console.log(xhr);
        });
    };

    DrinkService.getAllDrinks()
    .then(function  successHandler(data) {
      vm.drinks = data;
    })
    .catch(function failHandler(xhr){
      console.log(xhr);
    });
    /**
     * This function uses recursion to make multiple ajax calls and grabs a random
     * drinks.
     * @param  {number} numberOfDrinks maxium number of random drinks.
     */
    this.buildRandomArrayOfDrinks = function buildRandomArrayOfDrinks(numberOfDrinks) {
      DrinkService.getRandomDrink()
      .then(function successHandler(data) {
        vm.randomDrinkArray.push(data);
        if (vm.randomDrinkArray.length < numberOfDrinks) {
          vm.buildRandomArrayOfDrinks(numberOfDrinks);
        } else {
          return;
        }
      });
    };
    this.buildRandomArrayOfDrinks(10);
  }
}());

(function() {
  'use strict';

  angular.module('drink')
    .controller('SentimentController', SentimentController);

    SentimentController.$inject = [ '$q', 'SentimentService', 'DrinkService' ];

    function SentimentController( $q, SentimentService, DrinkService ) {

      var vm = this;
      this.happyArray = ['Cheers!!!!', 'Glad you are having a great day!', 'Drinks on the house' ];
      this.sadArray = ['Sorry you are having a bad day', 'Drink up!', 'Here try this!'];
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
        var random = Math.floor(Math.random()*3);
        if(mood === 'happy'){
          return this.happyArray[random];
        } else if(mood === 'sad') {
          return this.sadArray[random];
        }
      };
    }

}());

(function() {
  'use strict';

  angular.module('drink')
    .factory('SentimentService', SentimentService);

    SentimentService.$inject = [ '$http', '$q' ];

    function SentimentService($http, $q) {

      return {
        analyzeSentiment: analyzeSentiment
      };
      /**
       * Gets a number that is calculated based on the text that is used to
       * describe one's mood.  I transform the response from angular to only
       * return data in the promise callback.
       * @param  {string} sentiment the sentence describing your mood.
       * @return {promise} Ajax callback promise with transformed data.
       */
      function analyzeSentiment(sentiment) {
        if(typeof(sentiment) !== 'string') {
          return $q.reject('oops');
        }
        return $http({
          url: '/sentiment?feeling=' + sentiment,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(function transformSentimentResponse(response){
          // this returns a number
          return response.data.sentiment;
        });
      }
    }


}());
