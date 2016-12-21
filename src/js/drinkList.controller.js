(function() {
  'use strict';

  angular.module('drink')
    .controller('DrinkListController', DrinkListController);

  DrinkListController.$inject = [ 'DrinkService' ];

  function DrinkListController( DrinkService ) {
    console.log('creating DrinkListController');
    var vm =this;
    this.drinks = [];
    this.drink = {};

    DrinkService.getOneDrink()
    .then(function successHandler(data){
      vm.drink = data;
    })
    .catch (function failHandler(xhr) {
      console.log(xhr);
    });

    DrinkService.getAllDrinks()
    .then(function  successHandler(data) {
      vm.drinks = data;
    })
    .catch(function failHandler(xhr){
      console.log(xhr);
    });

  }
}());
