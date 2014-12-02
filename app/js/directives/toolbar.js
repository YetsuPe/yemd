
angular.module('yemd')
	.directive('toolbar',toolbar)
	.directive('appbar',toolbar);

function toolbar($yemd, $rootScope){
		
	return {
			scope: {
				type:'@', //extend, default'
				name: '@'
			},
			restrict:'C', 
			controller: function  ($scope, $element, $attrs, $transclude, $yemd, $rootScope){
			
				$rootScope.$on('changeTitleToolbar',function(event, name, newTitle){ 
					if ( $scope.name === name ) { $element.find('.toolbar__title').text(newTitle);  }; 
	      });
	        	
	      $rootScope.$on('changeTypeToolbar', function(e, name, className){ 

	      	if ( $scope.name === name ) { 
	      		$element.attr( 'class', 'toolbar--'+ className  );
	      	};

				});

	      $rootScope.$on('hideToolbar', function(e, name){
	      	if ( $scope.name === name ) {
	      		$element.addClass('hide');
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
