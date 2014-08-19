(function(yemd){  
	'use strict'; 
	yemd.directive('nav',nav);

	function nav($rootScope,$window,$verge,$document){
		return {
			scope: { 
				sidenav:'=yemd' //main(left),right
			},
			restrict:'E',  
			controller: function  ($scope, $element, $attrs,$rootScope,$verge,$document){
				var vm=this;
				vm.type = $scope.type || 'left';
				vm.className= 'sidenav--'+vm.type ; 

				vm.getHeightSidenav=  function(element){
					console.log($verge.viewportH() , element[0].clientHeight,element);
					if ($verge.viewportH() >= element[0].clientHeight) { 
						this.result= {'height': $verge.viewportH()+'px'} 
					}else{  
						$document.find('header').addClass('static');
						this.result= {'height': element[0].clientHeight+'px' , 'position':'absolute' } 
					};
					return this.result;
				}; 
				vm.getHeightToHead= function(){  
					this.heightFigure= $verge.viewportW() <= 320? ($verge.viewportW() - 56)*(9/16): 320*(9/16) ;
					return { height: this.heightFigure +"px" };
				}; 
			},
			controllerAs:'vm',
			compile: function(){
				return {
	        pre: function preLink(scope, element, iAttrs, vm) {  
	        	element.addClass(vm.className);
	        	element.find('figure').css( vm.getHeightToHead() );
	        },  
	        post: function postLink(scope, element, iAttrs, vm) { 
	        	console.log( vm.getHeightSidenav(element));
	        	element.css( vm.getHeightSidenav(element) );
	        	//responsive
	        	//$window.onresize= function(event){ 
	        		//element.find('figure').css( vm.getHeightToHead(element) );//appli height at figure
	        	//}
						$rootScope.$on('changeSidenavLeft', function(event,sidenavToggle) { 
				      sidenavToggle? element.removeClass('show').addClass('hide'):element.removeClass('hide').addClass('show'); 
				      $rootScope.yemd.sidenav.left.toggle=sidenavToggle? false: true; 
				   	});
	        }
	      };
			}
		};
	};

})(yemd);

