(function() {
  'use strict';

  var expect = chai.expect;

  describe('SentimentController', function() {

    var SentimentController;
    var mockSentimentService = {};
    var mockDrinkService = {};
    var $rootScope;

    beforeEach(module('drink'));

    beforeEach(module(function($provide){
      $provide.value('SentimentService', 'DrinkService', mockSentimentService, mockDrinkService);
    }));

    beforeEach(inject(function($controller, $q, _$rootScope_) {
      $rootScope = _$rootScope_;
      mockSentimentService.analyzeSentiment = function() {
        return $q.resolve({
          data: {
            sentiment: 1
          }
        }),
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
      };
      SentimentController = $controller('SentimentController');
    }));

    it('should have correct scope variables', function() {
      expect(SentimentController.sentiment).to.be.a('string');
      expect(SentimentController.dailyMessage).to.be.a('string');
      expect(SentimentController.sentimentValue).to.be.null;
      expect(SentimentController.displayDrinkDetails).to.equal(false);

    });

    // it('should give a numeric value when given a sentiment', function(){
    //   var result = SentimentController.calculateSentiment('happy');
    //   expect(result).to.be.an('object');
    // });
  });
}());
