
angular.module('yemd')
	.directive('toolbar',toolbar);

function toolbar($yemd, $rootScope){
		
	return {
			scope: {
				type:'@', //extend, default'
				name: '@'
			}, 
			controller: function  ($scope, $element, $attrs, $transclude, $yemd, $rootScope){
				
				//$scope.name = $scope.name || $attrs.toolbar ;
				//console.log($scope.name );
				$element.attr('class','toolbar--default');

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

			}
	};

};
