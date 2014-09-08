(function(yemd){  
	'use strict'; 
	
	sidenav.$inject=['$rootScope', '$window', '$verge', '$document'];
	function sidenav($rootScope,$window,$verge,$document){
		return {
			scope: { 
				type:'@' // left, right
			},
			restrict:'AEC',  
			controller: function  ($scope, $element, $attrs,$rootScope,$verge,$document ){
				var vm = this;
				vm.type = $scope.type || 'left';
				vm.className= 'sidenav--'+vm.type ; 

				vm.getHeightSidenav=  function(element){
					var height = vm.getHeightToHeadValue() + $element.find('section').eq(0)[0].clientHeight;  
					return ($verge.viewportH() > height )? { 'height':'100%' } : {'height': (vm.getHeightToHeadValue() + height) +'px' };
				}; 
				vm.getHeightToHeadValue= function(){ 
					return $verge.viewportW() <= 320? ($verge.viewportW() - 56)*(9/16)    : 320*(9/16) ;
				};
				vm.getHeightToHead= function(){   
					return { height: vm.getHeightToHeadValue() +"px" };
				}; 

			},
			controllerAs:'vm',
			compile: function(){
				return {
	        pre: function preLink(scope, element, iAttrs, vm) {  
	        	element.addClass(vm.className); 
	        	element.css(vm.getHeightSidenav());
	        	element.find('figure').css( vm.getHeightToHead() );
	        },  
	        post: function postLink(scope, element, iAttrs, vm) { 

	        	$rootScope.$on('changeSidenavLeft', function(event) { 
				      element.hasClass('show')? element.removeClass('show').addClass('hide'):element.removeClass('hide').addClass('show'); 
				   	});

	        	/*
	        	element.css( vm.getHeightSidenav(element) );

	        	element.find('a').on('click',function(e){
	        		e.preventDefault();
	        		$rootScope.$emit('changeSidenavLeft'); 
	        	});
	        	
	        	//responsive
	        	$window.onresize= function(event){    
	        		element.find('figure').css( vm.getHeightToHead() );
	        		element.css( vm.getHeightSidenav(element) ); 
	        	};

						
						*/
						

	        }
	      };
			}
		};
	};

	yemd.directive('yemdSidenav',sidenav);

})(yemd);

