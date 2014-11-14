'use strict';  

angular.module('yemd')
		.directive('card',card);

	function card($rootScope, $timeout){
		return {
			scope: {},  
			restrict:'AC',  
			controller:function($scope,$element,$attrs,$rootScope){
				//$scope.hide = ()?:;
			},
			compile: function(){
				return {
	        pre: function preLink(scope, element, attrs ) {  

	        		element.find('.card__cover').css({
								'background-image': "url('"+ element.find('.card__cover__image').attr('src')+"')" 
							});

	        		element.find('.card__photo').css({
								'background-image': "url('"+ element.find('.card__photo__image').attr('src')+"')" 
							});

	        }, 
	        post: function postLink(scope, element, attrs, $verge) {

	        }
	      };
			}
		};
	}; 
