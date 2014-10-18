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

	        	function toggleOverlay(){
	        		element.hasClass('show')? element.removeClass('show').addClass('hide'):element.removeClass('hide').addClass('show'); 
	        	}

	        	$rootScope.$on('changeModal', function(){
	        		//toggleOverlay();
						})

						$rootScope.$on('changeSidenavLeft', function(event) { 
							toggleOverlay();
				   	}); 
				   	
				   	$rootScope.$on('changeSidenavRight', function(event) { 
				   		toggleOverlay();
				   	}); 

				   	element.on('click',function(){ 
				   		$rootScope.$emit('closeSidenav'); 
				   		element.removeClass('show').addClass('hide'); 
				   	});
				  }
	      };
			}
		};
	};

})(yemd);

