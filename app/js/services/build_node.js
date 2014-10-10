(function(yemd){  
	'use strict'; 
	yemd.factory('buildNode', ['$rootScope', function($rootScope){
		return function htmlNode (html){
			var newNode = $rootScope.element(html); //html content 
			return newNode;
		}; 
	}]); 
	
})(yemd);