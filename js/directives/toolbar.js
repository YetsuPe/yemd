(function(yemd){  
	'use strict'; 
	yemd.directive('header',toolbar);

	function toolbar($rootScope){
		return {
			scope: {
				title:'=', //extend,normal
				type:'=', //extend,normal
				isAppbar: '='
			},
			restrict:'E', 
			//template:"<h1>{{ vm.title }}</h1>",
			controller: function  ($scope, $element, $attrs,$rootScope){
				var vm= this;
				vm.isAppbar= $scope.isAppbar || false ; 
				vm.title= $scope.title; 
				vm.type= $scope.type; 
				vm.nodeTitle= $rootScope.element("<h1>"+vm.title+"</h1>"); 
			},
			controllerAs:'toolbarController',
			compile: function(){
				return {
	        pre: function preLink(scope, iElement, iAttrs, toolbarController) {  
	        	iElement.append(toolbarController.nodeTitle);
	        	iElement.addClass('toolbar--'+toolbarController.type);
	        }, 
	        post: function postLink(scope, iElement, iAttrs, controller) {
	        }
	      };
			}
		};
	};

})(yemd);

