(function(angular, yemd){  
	'use strict';  

	action.$inject=['$rootScope', 'injectSvg', '$timeout'];

	function action($rootScope, injectSvg, $timeout){
		return {
			scope: {},  
			restrict:'C', 
			controller:function($scope,$element,$attrs,$rootScope){
				
			},
			compile: function(){
				return {
	        pre: function preLink(scope, element, attrs ) {   
 						element.css('display','none');
	        }, 
	        post: function postLink(scope, element, attrs) {

 						$rootScope.$on('showAction',function(e,className){
 							element.css('display','block');
		 					element.removeClass('hide').addClass('show action--'+className);
		 				});

		 				$rootScope.$on('hideAction',function(e){
		 					element.removeClass('show').addClass('hide');
		 				});

		 				element.on('click',function(){ 
		 					$rootScope.$emit('clickAction');
		 				});

	        }
	      };
			}
		};
	}; 

	yemd.directive('action',action);
})(angular, yemd);