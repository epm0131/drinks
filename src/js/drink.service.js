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
