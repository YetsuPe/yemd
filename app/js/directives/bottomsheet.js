angular.module('yemd')
	
	.directive('bottomSheet', bottomSheet);

function bottomSheet ($rootScope) {


	return {
		scope : {
			name:'=',
			type: '@'
		},
		controller: function($scope, $attrs, $element, $rootScope){
			
			$element.addClass('bottom-sheet--'+$scope.type+" hide");

			$rootScope.$on('toggleBottomSheet', function(e, name, toggle){

					if ( $attrs.bottomSheet === name ) { 
						if ( toggle ) {
							( $element.hasClass('hide') )? $element.removeClass('hide').addClass('show') : $element.addClass('show') ;

						}else {
							( $element.hasClass('show') )? $element.removeClass('show').addClass('hide') : $element.addClass('hide') ;

						};
						 
					}


			});

		}
	};

}
