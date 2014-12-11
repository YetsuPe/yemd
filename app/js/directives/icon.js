
angular.module('yemd')
	.directive('icon', icon);

	function icon($rootScope){
		return {
			scope:{
				icon: '='
			},
			controller: function($scope, $element, $attrs, $rootScope){

				$element.on('click', function(){
					$scope.icon.click();
				});

				$scope.$watch('icon.figure', function(){ $element.attr('class', $scope.icon.figure);});
				$scope.$watch('icon.click', function(){ $element.attr('class', $scope.icon.figure);});
				$scope.$watch('icon.show', function(){ if( !$scope.icon.show ){ $element.addClass('hide'); }else{ $element.removeClass('hide'); }; });

			}
		}
	}
