
angular.module('yemd')
		.directive('card',card);

	function card($rootScope, $timeout){
		return {
			scope: {
				photo: '@',
				cover: '='
			},
			controller:function($scope,$element,$attrs,$rootScope){
				
				var type = ($attrs.card==='')?'':'--'+$attrs.card;
				$element.addClass('card'+type);

			},
			compile: function(){
				return {
	        pre: function preLink(scope, element, attrs ) {  

	        }, 
	        post: function postLink(scope, element, attrs, $verge) {
	        	

	        	if ( attrs.card === 'square-picture' ) {
	        		element.css({
								'background-image': "url('"+ element.find('.card__cover__image').attr('src')+"')" 
							});
	        	};

	        	if ( element.find('.card__cover') ) {
	        		element.find('.card__cover').css({
								'background-image': "url('"+ element.find('.card__cover__image').attr('src')+"')" 
							});
	        	};
						
	        }
	      };
			}
		};
	}; 
