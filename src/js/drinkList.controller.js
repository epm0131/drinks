(function() {
  'use strict';

  angular.module('drink')
    .controller('DrinkListController', DrinkListController);

  DrinkListController.$inject = [ 'DrinkService' ];

  function DrinkListController( DrinkService ) {
    var vm = this;
    this.drinks = [];
    this.randomDrink = {};
    this.randomDrink1 = {};
    this.randomDrink2= {};
    this.randomDrink3 = {};
    this.randomDrink4 = {};
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

    DrinkService.getRandomDrink()
    .then(function successHandler(data) {
      vm.randomDrink = data;
    });

    DrinkService.getRandomDrink()
    .then(function successHandler(data) {
      vm.randomDrink1 = data;
    });

    DrinkService.getRandomDrink()
    .then(function successHandler(data) {
      vm.randomDrink2 = data;
    });

    DrinkService.getRandomDrink()
    .then(function successHandler(data) {
      vm.randomDrink3 = data;
    });

    DrinkService.getRandomDrink()
    .then(function successHandler(data) {
      vm.randomDrink4 = data;
    });
    
  }
}());
