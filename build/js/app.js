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
      var ingredient = null;
      var blankIngredient = null;

      return {

        getOneDrink: getOneDrink,
        getAllDrinks: getAllDrinks,
        getRandomDrink: getRandomDrink

      };
      /**
       * Get all the information about the cocktail when given name
       * I transform the response from angular to only return data in the
       * promise callback.
       * @param {string} drinkName the search string.
       * @return {promise} Ajax callback promise with transformed data.
       */
      function getOneDrink(drinkName) {
        if (!drinkName){
          return;
        }
        return $http({
          url: 'http://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + drinkName,
          method: 'GET'
        })
        .then(function transformDrinkResponse(response) {
           ingredient = response.data.drinks[0].strIngredient4;
          if (ingredient === '') {
            blankIngredient = true;
          }
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

  DrinkListController.$inject = [ 'DrinkService' ];

  function DrinkListController( DrinkService ) {
    var vm = this;
    this.drinks = [];
    this.drinkName = '';
    this.drink = {};

    /**
     * When provided a name of a drink it will pull all the details associated
     * with that drink name.
     * @param  {string} drinkName the name of drink you want to look up
     */
    this.lookUpDrink = function lookUpDrink(drinkName){
      if(typeof(drinkName) !== 'string') {
        return;
      }
      DrinkService.getOneDrink(drinkName)
      .then(function successHandler(data){
        vm.drink = data;
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

  }
}());

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
            vm.sentimentValue = data;
            DrinkService.getRandomDrink()
              .then(function (drink) {
                console.log("drink", drink);
                vm.drink = drink;
                console.log(vm.drink);
              });
          })
          .catch(function failHandler(xhr){
            console.log(xhr);
          });
      };

    }

}());

(function() {
  'use strict';

  angular.module('drink')
    .factory('SentimentService', SentimentService);

    SentimentService.$inject = [ '$http' ];

    function SentimentService($http) {

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
          return;
        }
        return $http({
          url: '/sentiment?feeling=' + sentiment,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(function transformSentimentResponse(response){
          return response.data.sentiment;
        });
      }
    }


}());
