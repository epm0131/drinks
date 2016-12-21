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

    it('should be to GET a list of all the alcholic cocktails', function (doneCallBack){
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

}());
