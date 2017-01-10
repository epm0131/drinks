(function() {
  'use strict';

  angular.module('drink')
    .factory('SentimentService', SentimentService);

    SentimentService.$inject = [ '$http', '$q' ];

    function SentimentService($http, $q) {

      return {
        analyzeSentiment: analyzeSentiment
      };
      /**
       * Gets a number that is calculated based on the text that is used to
       * describe one's mood.  I transform the response from angular to only
       * return data in the promise callback.
       * @param  {string} sentiment the sentence describing your mood.
       * @return {promise} Ajax callback promise with transformed data.
       */
      function analyzeSentiment(sentiment) {
        if(typeof(sentiment) !== 'string') {
          return $q.reject('oops');
        }
        return $http({
          url: '/sentiment?feeling=' + sentiment,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(function transformSentimentResponse(response){
          // this returns a number
          return response.data.sentiment;
        });
      }
    }


}());
