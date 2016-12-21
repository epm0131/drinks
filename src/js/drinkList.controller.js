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
      console.log('I am in of the lookUpDrink!?!', drinkName);
      DrinkService.getOneDrink(drinkName)
      .then(function successHandler(data){
        vm.drink = data;
        console.log('where i be?!?!', data);
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
