(function(yemd){  
	'use strict'; 
	yemd.directive('nav',nav);

	function nav($rootScope,$window){
		return {
			scope: { 
				type:'@' //main(left),right
			},
			restrict:'E',  
			controller: function  ($scope, $element, $attrs,$rootScope){
				var vm=this;
				vm.type = $scope.type || 'left';
				vm.className= 'sidenav--'+vm.type ;
				vm.getWidthHead=  function(){
					return typeof(jQuery)!=='undefined'? jQuery( "."+vm.className ).width() : Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - 56;
				}; 
				vm.applyHeightToHead= function(element, h){ 
					element.find('figure').css('height',h *(9/16)+"px"); // sidenav head 16:9
				};
			},
			controllerAs:'vm',
			compile: function(){
				return {
	        pre: function preLink(scope, element, iAttrs, vm) {  
	        	element.addClass(vm.className);
	        	(vm.getWidthHead() >= 320 )? vm.applyHeightToHead(element,264) : null ;
	        }, 
	        post: function postLink(scope, element, iAttrs, vm) {
	        	console.log($window);
	        	$window.onresize= function(event){
	        		console.log(vm.getWidthHead());
	        		(vm.getWidthHead() <= 320 )? vm.applyHeightToHead(element, vm.getWidthHead() ) : null ;
	        	}
	        }
	      };
			}
		};
	};

})(yemd);

