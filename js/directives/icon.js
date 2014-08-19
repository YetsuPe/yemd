(function(yemd){  
	'use strict'; 
	yemd.directive('icon',icon);

	function icon($rootScope, injectSvg){
		return {
			scope: {
				src:'='
			},
			require: ['?^header'] ,
			restrict:'EC', 
			compile: function(){
				return {
	        pre: function preLink(scope, element, attrs, requires ) { 
	        	var toolbarController = requires[0];
	        	element.append( injectSvg(scope.src.icon, element) );
	        	element.on('click',function(e){ 
	        		if ( scope.src.involve==='sidenavLeft' && toolbarController.isAppbar ) {
	        			$rootScope.yemd.sidenav.left.toggle=$rootScope.yemd.sidenav.left.toggle?false:true;
	        			console.log($rootScope.yemd.sidenav.left.toggle,'change');
	        		};
	        		if ( scope.src.involve==='refresh' && toolbarController.isAppbar ) {
	        			console.log("refresh app");
	        		};
	        		if ( scope.src.involve==='menuAbout' && toolbarController.isAppbar ) {
	        			console.log("Show menu About/settings/feed");
	        		};
	        		if ( scope.src.involve==='sidenavRight' && toolbarController.isAppbar ) {
	        			console.log("open Sidenav Right");
	        		};

	        	});
	        }, 
	        post: function postLink(scope, element, attrs, toolbarController) {
	        	//console.log(toolbar);
	        }
	      };
			}/* ,
			link: function (scope, element, attrs,toolbarController){
				console.log(toolbarController);
			}*/
		};
	};

})(yemd);
