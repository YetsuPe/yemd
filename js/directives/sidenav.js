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
						//$document.find('header').addClass('static');
						var listHeight = element.find('section')[0].clientHeight ;
						console.log("sidenav",vm.getHeightToHeadValue(),'list',listHeight);
						this.result= {'height': (vm.getHeightToHeadValue() + listHeight) +'px' , 'position':'absolute' } 
					};
					return this.result;
				}; 
				vm.getHeightToHeadValue= function(){ 
					return this.heightFigure= $verge.viewportW() <= 320? ($verge.viewportW() - 56)*(9/16): 320*(9/16) ;
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
	        	element.find('figure').css( vm.getHeightToHead() );
	        },  
	        post: function postLink(scope, element, iAttrs, vm) { 
	        	element.css( vm.getHeightSidenav(element) );
	        	//responsive
	        	$window.onresize= function(event){  
	        		console.log(event);
	        		element.find('figure').css( vm.getHeightToHead() ); 
	        		//fix 
	        		element.css( vm.getHeightSidenav(element) );
	        	}
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

