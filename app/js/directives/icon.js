
angular.module('yemd')
	.directive('icon', icon);

	function icon($rootScope, $log){
		return {
			scope:{
				icon: '='
			},
			controller: function($scope, $element, $attrs, $rootScope, $log){

				if ( typeof($scope.icon) === 'undefined' || typeof($scope.icon) !== 'object' ) {
					return $log.warn( "Shoud pass an object to the icon directive"," (Type: "+ typeof($scope.icon)+')' );
				}

				$element.on('click', function(event){ 
					if ( typeof( $scope.icon.click ) === 'function'  ) { $scope.icon.click(event) ; };
				});
				
				$scope.$watch('icon.icon', function(){ $element.attr('class', $scope.icon.icon || 'mdfi_image_timer_auto' );});
				
				$scope.$watch('icon.show', function(){ 
					if ( typeof($scope.icon.show) === 'undefined' ) { $scope.icon.show = true };
					if ( $scope.icon.show && $element.hasClass('hide') ){ $element.removeClass('hide'); }
					if ( !$scope.icon.show && !$element.hasClass('hide') ) { $element.addClass('hide'); };
				});

			}
		}
	}
