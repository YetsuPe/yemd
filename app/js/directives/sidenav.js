(function(yemd){  
	'use strict'; 
	
	sidenav.$inject=['$rootScope', '$window', '$verge', '$document'];
	function sidenav($rootScope,$window,$verge,$document){
		return {
			scope: { 
				type:'@', // left, right
				isAppbar: '@'
			},
			restrict:'AEC',  
			controller: function  ($scope, $element, $attrs,$rootScope,$verge,$document ){
				var vm = this;
				vm.type = $scope.type || 'left';
				vm.className= 'sidenav--'+vm.type ; 

				vm.getHeightSidenav=  function(element){
					var height = 50;//(vm.type==='left')? vm.getHeightToHeadValue() + element.children('section')[0].clientHeight: $element.children('section')[0].clientHeight ;  
					//console.log( $verge.viewportH() , vm.getHeightToHeadValue(), element.children('section').eq(0).height() );
					return ($verge.viewportH() > height )? { 'height':'100%' } : {'height': (vm.getHeightToHeadValue() + height) +'px', 'overflow-y': scroll };
				}; 
				vm.getHeightToHeadValue= function(){ 
					return $verge.viewportW() < 320? ($verge.viewportW() - 56)*(9/16)    : 264*(9/16) ;
				};
				vm.getHeightToHead= function(){   
					return { 'height': vm.getHeightToHeadValue() +"px" };
				}; 

			},
			controllerAs:'vm',
			compile: function(tElement, tAttrs){

				return {
	        pre: function preLink(scope, element, attrs, vm) {   
	          element.addClass(vm.className); 
	        	element.find('figure').css( vm.getHeightToHead() );

	        },  
	        post: function postLink(scope, element, attrs, vm) {

	        	element.css( vm.getHeightSidenav(element) );

	        	/*
	        	element.find('a').on('click',function(e){
	        		e.preventDefault();
	        		$rootScope.$emit('changeSidenavLeft'); 
	        	});
						*/
	        	
	        	$rootScope.$on('changeSidenavLeft', function(event) { 
	        		if ( scope.type === "left" ) {
	        			element.hasClass('show')  ? element.removeClass('show').addClass('hide'):element.removeClass('hide').addClass('show'); 
	        		};
				   	});
	        	$rootScope.$on('changeSidenavRight', function(event) { 
	        		if ( scope.type === "right" ) {
	        			element.hasClass('show')  ? element.removeClass('show').addClass('hide'):element.removeClass('hide').addClass('show'); 
	        		};
				   	});

	        	$rootScope.$on('closeSidenav', function(event) { 
	        		if ( scope.type === "left" ) {
	        			if ( element.hasClass('show') ) { element.removeClass('show').addClass('hide'); } ; 
	        		}else if(scope.type === "right"){
	        			if ( element.hasClass('show') ) { 
	        				$rootScope.$emit('closeSidenavRight'); 
	        				element.removeClass('show').addClass('hide'); 
	        			} ; 
	        		};
	        	});



	        	//responsive
	        	$window.onresize= function(event){   
	        		element.find('figure').css( vm.getHeightToHead() );
	        	};

	        }
	      };
			}
		};
	};

	yemd.directive('sidenav',sidenav);

})(yemd);

