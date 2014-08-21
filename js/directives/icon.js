	'use strict';  
	icon.$inject=['$rootScope', 'injectSvg'];
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
	        	element.append( injectSvg(scope.src.icon, element) ); 
	        }, 
	        post: function postLink(scope, element, attrs, requires) {
	        	var toolbarController = requires[0];
	        	element.on('click',function(e){  
	        		if ( toolbarController.isAppbar ) {
	        			if ( scope.src.involve==='sidenavLeft') {
	        				console.log("toggel sidenav");
		        			$rootScope.$emit('changeSidenavLeft', $rootScope.yemd.sidenav.left.toggle);
		        		};
		        		if ( scope.src.involve==='refresh') {
		        			console.log("refresh app");
		        		};
		        		if ( scope.src.involve==='menuAbout') {
		        			console.log("Show menu About/settings/feed");
		        		};
		        		if ( scope.src.involve==='sidenavRight') {
		        			console.log("open Sidenav Right");
		        		};
	        		};
	        	});
	        }
	      };
			}/* ,
			link: function (scope, element, attrs,toolbarController){
				console.log(toolbarController);
			}*/
		};
	}; 

	angular.module('yemd').directive('icon',icon);