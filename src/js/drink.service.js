(function() {
  'use strict';

  angular.module('drink')
    .factory('DrinkService', DrinkService);

    DrinkService.$inject = [ '$http' ];

    function DrinkService($http) {

      return {

        getOneDrink: getOneDrink,
        getAllDrinks: getAllDrinks

      };
      /**
       * Get all the information about the cocktail when given name
       * I transform the response from angular to only return data in the
       * promise callback.
       * @param {string} drinkName the search string.
       * @return {promise} Ajax callback promise with transformed data.
       */
      function getOneDrink(drinkName) {
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
  }

}());
