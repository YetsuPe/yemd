(function(angular, yemd){  
	'use strict';  

	card.$inject=['$rootScope', '$timeout'];

	function card($rootScope, $timeout){
		return {
			scope: {},  
			restrict:'E', 
			//template:"<dl ng-repeat='(field,value) in item' ng-hide=\" field==='id' \" ><dt>{{field}}</dt><dd>{{value}}</dd></dl>",
			controller:function($scope,$element,$attrs,$rootScope){
				//$scope.hide = ()?:;
			},
			compile: function(){
				return {
	        pre: function preLink(scope, element, attrs ) {  

	        }, 
	        post: function postLink(scope, element, attrs) {
 						  
	        }
	      };
			}
		};
	}; 

	yemd.directive('card',card);
})(angular, yemd);