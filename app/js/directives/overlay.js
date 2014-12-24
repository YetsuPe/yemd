
	angular.module('yemd')
	.directive('overlay',overlay);

	function overlay($rootScope, $timeout){
		return {
			scope: {},
			controller: function($scope, $element, $attrs, $rootScope, $timeout){
				/*
				$rootScope.$on('toggleSidenav', toggleSidenav);
				*/
				$rootScope.$on('toggleOverlay', toggleOverlay);
				
				$element.on('click', closeOverlay );
				/*
				function toggleSidenav(e, type, toggle){
					toggleOverlay(e, toggle);
				}
				*/
				function toggleOverlay(e, toggle){
					if ( toggle ) {
						$element.hasClass('hide') ? $element.removeClass('hide').addClass('show') : $element.addClass('show');
	        }else{
						$element.hasClass('show') ? $element.removeClass('show').addClass('hide') : $element.addClass('hide');
	        };
				}
				
				function closeOverlay(){
				  $rootScope.$emit('clickOverlay');
				  $element.removeClass('show').addClass('hide');

				  $timeout(function(){
				  	$element.removeClass('hide');
				  	$element.remove();
				  }, 750);

	      }

			},
			compile: function(tElement, tAttrs){

				tElement.addClass('overlay');
			}
		};
	};

