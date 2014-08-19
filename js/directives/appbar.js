(function(yemd){  
	'use strict'; 
	yemd.directive('appbar',appbar);

	function appbar($rootScope){
		return {
			scope: {
				type:'=' //extend,normal
			},
			//require:'?toolbar',
			restrict:'EC',  
			controller: function ($scope, $element, $attrs,$rootScope){
				var vm= this; 
				vm.type= $scope.type;
			},
			link: function($scope, element, iAttrs, vm) { 
				element.addClass('appbar--'+$scope.type); //fefinde type of toolbar
			}
		};
	};

})(yemd);
