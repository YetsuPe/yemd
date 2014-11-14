'use strict'; 

angular.module('yemd')
	.directive('toolbar',toolbar)
	.directive('appbar',toolbar);

function toolbar($yemd, $rootScope){
		
	return {
			scope: {
				type:'@' //extend,normal'
			}, 
			transclude: true,
			restrict:'C', 
			templateUrl: 'templates/toolbar.html',
			controller: function  ($scope, $element, $attrs, $transclude, $yemd, $rootScope){
				
				if ( $attrs.class.indexOf('appbar') !== -1 ) {
					$scope.menu = $yemd.sidenav.left.show; 
					$scope.menuRight = $yemd.sidenav.right.show;
				};
				 

				$scope.openMenu = function(side) {
					$rootScope.$emit('toggleSidenav', side, true);
				}

				$rootScope.$on('changeTitleAppbar',function(event,newTitle){ 
	      	if ( $attrs.class.indexOf('appbar') !== -1 ) {
						$element.find('.appbar__title').text(newTitle); 
					};
	      });
	        	
	      $rootScope.$on('changeAppbar', function(e, className){ 
	      	if ( $attrs.class.indexOf('appbar') !== -1 ) {
						$element.addClass( className );
					};
				});

			},
			compile: function(){
				return {
	        pre: function preLink(scope, element, iAttrs, toolbarController) { 

	        }, 
	        post: function postLink(scope, element, iAttrs, toolbarController) {

	        	

	        }
	      };
			}
	};

};
