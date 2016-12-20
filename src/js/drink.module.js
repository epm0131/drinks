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
