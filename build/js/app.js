(function() {
  'use strict';

  angular.module('drink', [ 'ui.router' ])
    .config(routerConfig);

  routerConfig.$inject = [ '$stateProvider'];

  function routerConfig($stateProvider) {

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

(function() {
  'use strict';

  angular.module('drink')
    .controller('DrinkListController', DrinkListController);

  DrinkListController.$inject = [ 'DrinkService' ];

  function DrinkListController( DrinkService ) {
    console.log('creating DrinkListController');
    var vm =this;
    this.drinks = [];

    DrinkService.getAllDrinks()
    .then(function  successHandler(data) {
      vm.drinks = data;
    })
    .catch(function failHandler(xhr){
      console.log(xhr);
    });

  }
}());
