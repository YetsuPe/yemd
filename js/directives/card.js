(function(angular, yemd){  
	'use strict';  

	card.$inject=['$rootScope', '$timeout'];

	function card($rootScope, $timeout){
		return {
			scope: {},  
			restrict:'EA', 
			//template:"<dl ng-repeat='(field,value) in item' ng-hide=\" field==='id' \" ><dt>{{field}}</dt><dd>{{value}}</dd></dl>",
			controller:function($scope,$element,$attrs,$rootScope){
				//$scope.hide = ()?:;
			},
			compile: function(){
				return {
	        pre: function preLink(scope, element, attrs ) {  
	        	if ( attrs.class='card--figure' ) {
	        		var image = element.find('img').eq(0);
	        		var blockImage=angular.element("<div'></div>"); 
	        		//console.log( "url('"+image.attr('src')+"'')" );
	        		blockImage.css({ 'background-image': "url('"+image.attr('src')+"')", height:element[0].clientHeight+"px" });
	        		blockImage.addClass(image.attr('class'));
	        		image.remove();
	        		element.prepend(blockImage);
	        	};
	        }, 
	        post: function postLink(scope, element, attrs) {
 						  
	        }
	      };
			}
		};
	}; 

	yemd.directive('yemdCard',card);

})(angular, yemd);