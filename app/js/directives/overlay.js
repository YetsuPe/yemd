'use strict'; 
	
	angular.module('yemd')
	.directive('overlay',overlay);

	function overlay($rootScope){
		return {
			scope: {},
			restrict:'C',
			controller: function($scope, $element, $attrs, $rootScope){

				$rootScope.$on('toggleSidenav',function(e, type, toggle){  
					if ( toggle ) {
						$element.hasClass('hide') ? $element.removeClass('hide').addClass('show') : $element.addClass('show');
	        }else{
						$element.hasClass('show') ? $element.removeClass('show').addClass('hide') : $element.addClass('hide');
	        };
				});

				$element.on('click', closeOverlay );

				function closeOverlay(){
				  $rootScope.$emit('clickOverlay');
				  $element.hasClass('show') ? $element.removeClass('show').addClass('hide') : $element.addClass('hide');
	      }

			},   
			compile: function(){
				return {
	        pre: function preLink(scope, element, iAttrs) {   
	        },  
	        post: function postLink(scope, element, iAttrs) { 
				  }
	      };
			}
		};
	};

