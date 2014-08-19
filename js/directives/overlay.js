(function(yemd){  
	'use strict'; 
	yemd.directive('overlay',overlay);

	function overlay($rootScope){
		return {
			scope: {},
			restrict:'C',
			controller: function($scope){
				$scope.toggle=false;
			},   
			compile: function(){
				return {
	        pre: function preLink(scope, element, iAttrs) {   
	        },  
	        post: function postLink(scope, element, iAttrs) {  
						$rootScope.$on('changeSidenavLeft', function(event,sidenavToggle) {  
							sidenavToggle? element.removeClass('show').addClass('hide'):element.removeClass('hide').addClass('show');
				   	}); 
				   	element.on('click',function(){
				   		console.log("click overlay");  
				   		$rootScope.$emit('changeSidenavLeft', $rootScope.yemd.sidenav.left.toggle); 
				   	});
				  }
	      };
			}
		};
	};

})(yemd);

