// (function() {
//   'use strict';
//
//   var expect = chai.expect;
//
//   describe('DrinkListController', function() {
//
//     var DrinkListController;
//     var mockDrinkService = {};
//
//     beforeEach(module('drink'));
//
//     beforeEach(module(function($provide) {
//       $provide.value('DrinkService', mockDrinkService);
//     }));
//
//     beforeEach(inject(function($controller, $q) {
//
//       mockDrinkService.lookUpDrink = function() {
//         return $q.resolve([
//           {
//             "idDrink": "13060",
//             "strDrink": "Margarita",
//             "strCategory": "Ordinary Drink",
//             "strAlcoholic": "Alcoholic",
//             "strGlass": "Cocktail glass",
//             "strInstructions": "Rub rim of cocktail glass with lime juice, dip rim in salt. Shake all ingredients with ice, strain into the salt-rimmed glass, and serve.",
//             "strDrinkThumb": "http://www.thecocktaildb.com/images/media/drink/wpxpvu1439905379.jpg",
//             "strIngredient1": "Tequila",
//             "strIngredient2": "Triple sec",
//             "strIngredient3": "Lime juice",
//             "strIngredient4": "Salt",
//             "strIngredient5": "",
//             "strIngredient6": "",
//             "strIngredient7": "",
//             "strIngredient8": "",
//             "strIngredient9": "",
//             "strIngredient10": "",
//             "strIngredient11": "",
//             "strIngredient12": "",
//             "strIngredient13": "",
//             "strIngredient14": "",
//             "strIngredient15": "",
//             "strMeasure1": "1 1/2 oz ",
//             "strMeasure2": "1/2 oz ",
//             "strMeasure3": "1 oz ",
//             "strMeasure4": "\n",
//             "strMeasure5": "\n",
//             "strMeasure6": "\n",
//             "strMeasure7": "\n",
//             "strMeasure8": "\n",
//             "strMeasure9": "\n",
//             "strMeasure10": "",
//             "strMeasure11": "",
//             "strMeasure12": "",
//             "strMeasure13": "",
//             "strMeasure14": "",
//             "strMeasure15": "",
//             "dateModified": "2015-08-18 14:42:59"
//           }
//         ]);
//       };
//
//       mockDrinkService.getAllDrinks = function() {
//         return $q.resolve([
//           {
//             strDrink: "'57 Chevy with a White License Plate",
//             strDrinkThumb: "http://www.thecocktaildb.com/images/media/drink/qyyvtu1468878544.jpg",
//             idDrink: "14029"
//         }]);
//       };
//
//     DrinkListController = $controller('DrinkListController');
//     }));
//
//     it('should have correct scope variables', function() {
//       expect(DrinkListController.drinks).to.be.an('array');
//       expect(DrinkListController.drinks.length).to.equal(0);
//       expect(DrinkListController.drink).to.be.a('object');
//       expect(DrinkListController.drinkName).to.be.a('string');
//     });
//
//
//   });
// }());
