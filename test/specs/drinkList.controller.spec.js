(function() {
  'use strict';

  var expect = chai.expect;

  describe('DrinkListController', function() {

    var DrinkListController;
    var mockDrinkService = {};

    beforeEach(module('drink'));

    beforeEach(module(function($provide) {
      $provide.value('DrinkService', mockDrinkService);
    }));

    beforeEach(inject(function($controller, $q) {

      mockDrinkService.getAllDrinks = function() {
        return $q.resolve([
          {
            strDrink: "'57 Chevy with a White License Plate",
            strDrinkThumb: "http://www.thecocktaildb.com/images/media/drink/qyyvtu1468878544.jpg",
            idDrink: "14029"
        }]);
      };

    DrinkListController = $controller('DrinkListController');
    }));

    it('should have correct scope variables', function() {
      expect(DrinkListController.drinks).to.be.an('array');
      expect(DrinkListController.drinks.length).to.equal(0);
      expect(DrinkListController.drink).to.be.a('object');
      expect(DrinkListController.drinkName).to.be.a('string');
    });
  });
}());
