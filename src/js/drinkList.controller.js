(function() {
  'use strict';

  angular.module('drink')
    .controller('DrinkListController', DrinkListController);

  DrinkListController.$inject = [ '$q', 'DrinkService' ];

  function DrinkListController( $q, DrinkService ) {
    var vm = this;
    this.drinks = [];
    this.randomDrinkArray = [];
    this.randomDrink = {};
    this.drinkName = '';
    this.drink = {};
    this.displayDrinkDetails = false;

    /**
     * When provided a name of a drink it will pull all the details associated
     * with that drink name.
     * @param  {string} drinkName the name of drink you want to look up
     * @return {Promise}
     */
    this.lookUpDrink = function lookUpDrink(drinkName){
      if(typeof(drinkName) !== 'string') {
        return $q.reject('oops');
      }
      return DrinkService.getOneDrink(drinkName)
        .then(function successHandler(data){
          vm.drink = data;
          vm.displayDrinkDetails = true;
          return data;
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
    /**
     * This function uses recursion to make multiple ajax calls and grabs a random
     * drinks.
     * @param  {number} numberOfDrinks maxium number of random drinks.
     */
    this.buildRandomArrayOfDrinks = function buildRandomArrayOfDrinks(numberOfDrinks) {
      DrinkService.getRandomDrink()
      .then(function successHandler(data) {
        vm.randomDrinkArray.push(data);
        if (vm.randomDrinkArray.length < numberOfDrinks) {
          vm.buildRandomArrayOfDrinks(numberOfDrinks);
        } else {
          return;
        }
      });
    };
    this.buildRandomArrayOfDrinks(10);
  }
}());
