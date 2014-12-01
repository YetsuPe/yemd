
angular.module('yemd')
		.directive('card',card);

	function card($rootScope, $timeout){
		return {
			scope: {
				photo: '@',
				cover: '='
			},  
			restrict:'C',  
			controller:function($scope,$element,$attrs,$rootScope){
				//$scope.hide = ()?:;
			},
			compile: function(){
				return {
	        pre: function preLink(scope, element, attrs ) {  

	        		

	        }, 
	        post: function postLink(scope, element, attrs, $verge) {

	        	if ( typeof( scope.photo ) !== 'undefined' ) {
	        		element.find('.card__photo').css({
								'background-image': "url('"+ scope.photo +"')" 
							});
	        	};

	        	element.find('.card__cover').css({
							'background-image': "url('"+ element.find('.card__cover__image').attr('src')+"')" 
						});

	        	//element.find('.card__photo').css({
							//'background-image': "url('"+ element.find('.card__photo__image').attr('src')+"')" 
						//});
	        }
	      };
			}
		};
	}; 
