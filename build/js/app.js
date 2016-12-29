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
          templateUrl:'views/home.template.html'
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
          console.log(response.data.drinks[0].strIngredient3);
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

    this.lookUpDrink = function lookUpDrink(drinkName){
      DrinkService.getOneDrink(drinkName)
      .then(function successHandler(data){
        vm.drink = data;
      })
      .catch (function failHandler(xhr) {
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
