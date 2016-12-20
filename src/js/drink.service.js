(function() {
  'use strict';

  angular.module('drink')
    .factory('DrinkService', DrinkService);

    DrinkService.$inject = [ '$http' ];

    function DrinkService($http) {

      return {

        // getOneDrink: getOneDrink,
        getAllDrinks: getAllDrinks
      };

      /**
       * Get cocktail data from cocktail database.  I transform the response
       * from angular to only return data in the promise callback.
       * @return {Promise} Ajax callback promise with transformed data.
       */
      function getAllDrinks() {
        return $http({
          url: 'http://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic',
          method: 'GET',
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
      // function getOneDrink() {
      //
      // }
    }
  }

}());
