(function() {
  'use strict';

  var expect = chai.expect;

  describe('Get list of cocktails', function() {

    var DrinkService;
    var $httpBackend;
    var $rootScope;

    beforeEach(module('drink'));

    beforeEach(inject(function(_$rootScope_, _$httpBackend_, _DrinkService_) {
      DrinkService = _DrinkService_;
      $httpBackend = _$httpBackend_;
      $rootScope = _$rootScope_;

      $httpBackend
        .whenGET('http://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic')
        .respond({
          drinks: [
            {
              strDrink: '57 Chevy with a White License Plate',
              strDrinkThumb: 'http://www.thecocktaildb.com/images/media/drink/qyyvtu1468878544.jpg',
              idDrink: 14029
            }
          ]
        });

        $httpBackend
          .whenGET('views/home.template.html')
          .respond('What??');
    }));

    it('should be able to GET a list of all the alcholic cocktails', function (doneCallBack){
      var result = DrinkService.getAllDrinks();
      expect(result).to.be.a('object');
      expect(result.then).to.be.a('function');
      expect(result.catch).to.be.a('function');

      result
        .then(function(data){
          expect(data[0].strDrink).to.equal('57 Chevy with a White License Plate');
          doneCallBack();
        })
        .catch(function(){
          doneCallBack('I hope to never get here!!');
        });
        $httpBackend.flush();
    });

  });

  describe('Get a cocktails', function() {

    var DrinkService;
    var $httpBackend;
    var $rootScope;

    beforeEach(module('drink'));

    beforeEach(inject(function(_$rootScope_, _$httpBackend_, _DrinkService_) {
      DrinkService = _DrinkService_;
      $httpBackend = _$httpBackend_;
      $rootScope = _$rootScope_;

      $httpBackend
        .whenGET('http://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
        .respond({
          drinks: [
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
          ]
        });

        $httpBackend
          .whenGET('views/home.template.html')
          .respond('What??');
    }));

    it('should be able to GET a cocktail with all of its details', function (doneCallBack){
      var result = DrinkService.getOneDrink('margarita');
      expect(result).to.be.a('object');
      expect(result.then).to.be.a('function');
      expect(result.catch).to.be.a('function');

      result
        .then(function(data){
          expect(data[0].strIngredient4).to.equal('Salt');
          expect(data[0].strIngredient5).to.equal('');
          doneCallBack();
        })
        .catch(function(){
          doneCallBack('I hope to never get here!!');
          });
          $httpBackend.flush();
    });
});


}());
