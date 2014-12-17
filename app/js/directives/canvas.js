
angular.module('yemd')
	.directive('canvas', canvas);

	function canvas($rootScope, $verge, $yemd, $window){
		return {
			scope:{
				name: '@'
			},
			restrict: 'C',
			controller: function($scope, $element, $attrs, $rootScope, $verge, $yemd, $window){
				
				$element.attr('class','canvas--default');
				$scope.className = 'default';
				
				$rootScope.$on('changeTypeCanvas', function(e, name, className){ 
	      	$scope.className = className;
	      	resizeWindow();
				});

				function resizeWindow() {
					if ( $verge.viewportW() >= $yemd.mqMedium && $scope.className !== 'default' ) {
						if ( $scope.className ==='block' ) { $rootScope.$emit('changeTypeToolbar','appbar', '2rows'); };
						$element.attr( 'class', 'canvas--'+ $scope.className  );
					}else if( $scope.className === 'default' ) {
						//$rootScope.$emit('changeTypeToolbar','appbar', 'default');
						$element.attr( 'class', 'canvas--default' );
					};
				}

				$window.onresize = function(event) {
					resizeWindow();
					$rootScope.$emit('resizeWindow');
				};

			}
		}
	}
