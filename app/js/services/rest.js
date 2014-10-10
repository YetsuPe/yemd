(function(angular,yemd,$){
	"use strict";
	yemd
  .factory('rest', ['$http', function($http){
    return function(uri, method, data){ 
      return $http({
                    method:method, 
                    url: 'http://consama.com.pe/rest/'+uri,  
                    data: $.param(data), 
                    headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 
            }).then(function(respond){ 
                return respond.data ; 
            });
    };
  }]);
})(angular,yemd,jQuery);