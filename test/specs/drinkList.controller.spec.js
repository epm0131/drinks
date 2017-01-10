(function() {
  'use strict';

  var expect = chai.expect;

  describe('DrinkListController', function() {

    var DrinkListController;
    var mockDrinkService = {};
    var $rootScope;

    beforeEach(module('drink'));

    beforeEach(module(function($provide) {
      $provide.value('DrinkService', mockDrinkService);
    }));

    beforeEach(inject(function($controller, $q, _$rootScope_) {
      $rootScope = _$rootScope_;
      mockDrinkService.getOneDrink = function() {
        return $q.resolve([
          {
            "idDrink": "13060",
            "strDrink": "Margarita",
            "strCategory": "Ordinary Drink",
            "strAlcoholic": "Alcoholic",
            "strGlass": "Cocktail glass",
            "strInstructions": "Rub rim of cocktail glass with lime juice, dip rim in salt. Shake all ingredients with ice, strain into the salt-rimmed glass, and serve.",
            "strDrinkThumb": "http://www.thecocktaildb.com/images/media/drink/wpxpvu1439905379.jpg",
            "strIngredient1": "Tequila",
            "strIngredient2": "Triple sec",
            "strIngredient3": "Lime juice",
            "strIngredient4": "Salt",
            "strIngredient5": "",
            "strIngredient6": "",
            "strIngredient7": "",
            "strIngredient8": "",
            "strIngredient9": "",
            "strIngredient10": "",
            "strIngredient11": "",
            "strIngredient12": "",
            "strIngredient13": "",
            "strIngredient14": "",
            "strIngredient15": "",
            "strMeasure1": "1 1/2 oz ",
            "strMeasure2": "1/2 oz ",
            "strMeasure3": "1 oz ",
            "strMeasure4": "\n",
            "strMeasure5": "\n",
            "strMeasure6": "\n",
            "strMeasure7": "\n",
            "strMeasure8": "\n",
            "strMeasure9": "\n",
            "strMeasure10": "",
            "strMeasure11": "",
            "strMeasure12": "",
            "strMeasure13": "",
            "strMeasure14": "",
            "strMeasure15": "",
            "dateModified": "2015-08-18 14:42:59"
          }
        ]);
      };

      mockDrinkService.getAllDrinks = function() {
      return $q.resolve([
        {
          strDrink: "'57 Chevy with a White License Plate",
          strDrinkThumb: "http://www.thecocktaildb.com/images/media/drink/qyyvtu1468878544.jpg",
          idDrink: "14029"
        }]);
      };

      mockDrinkService.getRandomDrink = function() {
        return $q.resolve([
          {
            "idDrink": "11016",
            "strDrink": "Brandy Alexander",
            "strCategory": "Ordinary Drink",
            "strAlcoholic": "Alcoholic",
            "strGlass": "Cocktail glass",
            "strInstructions": "Shake all ingredients (except nutmeg) with ice and strain contents into a cocktail glass. Sprinkle nutmeg on top and serve.",
            "strDrinkThumb": "http://www.thecocktaildb.com/images/media/drink/tvqxvr1483387746.jpg",
            "strIngredient1": "Brandy",
            "strIngredient2": "Creme de Cacao",
            "strIngredient3": "Light cream",
            "strIngredient4": "Nutmeg",
            "strIngredient5": "",
            "strIngredient6": "",
            "strIngredient7": "",
            "strIngredient8": "",
            "strIngredient9": "",
            "strIngredient10": "",
            "strIngredient11": "",
            "strIngredient12": "",
            "strIngredient13": "",
            "strIngredient14": "",
            "strIngredient15": "",
            "strMeasure1": "1 oz ",
            "strMeasure2": "1 oz white ",
            "strMeasure3": "1 oz ",
            "strMeasure4": "\n",
            "strMeasure5": "\n",
            "strMeasure6": "\n",
            "strMeasure7": "\n",
            "strMeasure8": "\n",
            "strMeasure9": "\n",
            "strMeasure10": "",
            "strMeasure11": "",
            "strMeasure12": "",
            "strMeasure13": "",
            "strMeasure14": "",
            "strMeasure15": "",
            "dateModified": "2017-01-02 20:09:06"
          }
        ]);
      };
      DrinkListController = $controller('DrinkListController');
    }));

    it('should have correct scope variables', function() {
      expect(DrinkListController.drinks).to.be.an('array');
      expect(DrinkListController.drinks.length).to.equal(0);
      expect(DrinkListController.drink).to.be.a('object');
      expect(DrinkListController.drinkName).to.be.a('string');
      expect(DrinkListController.randomDrink).to.be.a('object');
      expect(DrinkListController.randomDrink1).to.be.a('object');
      expect(DrinkListController.randomDrink2).to.be.a('object');
      expect(DrinkListController.randomDrink3).to.be.a('object');
      expect(DrinkListController.randomDrink4).to.be.a('object');
      expect(DrinkListController.randomDrink5).to.be.a('object');
      expect(DrinkListController.lookUpDrink).to.be.a('function');
    });

    it('should be able to get a cocktail when given a name', function(doneCallBack) {
      var result = DrinkListController.lookUpDrink('Margarita');
      expect(result).to.be.an('object');
      expect(result.then).to.be.a('function');
      expect(result.catch).to.be.a('function');

      result
        .then(function(data) {
          expect(data[0].strDrink).to.equal('Margarita');
          expect(data[0].strIngredient1).to.equal('Tequila');
          doneCallBack();
        })
        .catch(function(err){
          console.log('err msg', err.message);
          doneCallBack('I hope to never get here!!');
        });
        $rootScope.$digest();
    });

    it('should fail if the name is not a string', function() {
      var failedAttempt = DrinkListController.lookUpDrink(123);
      expect(failedAttempt).to.be.a('object');
      expect(failedAttempt.then).to.be.a('function');
      expect(failedAttempt.catch).to.be.a('function');
    });

    it('should fail if the name is not a string', function() {
      var failedAttempt = DrinkListController.lookUpDrink();
      expect(failedAttempt).to.be.a('object');
      expect(failedAttempt.then).to.be.a('function');
      expect(failedAttempt.catch).to.be.a('function');
    });



  });
}());
