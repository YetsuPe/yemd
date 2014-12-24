
angular.module('yemd')
	.directive('action',action);

	function action($yemd, $rootScope, $log){
		return {
			scope: {
				container: '@',
				x:'@', // left, right
				y: '@' //	top, bottom
			},
			controller:function($scope, $element, $attrs, $yemd, $rootScope){

				if ( $scope.container ==='appbar' ) {
					$element.attr('class', 'action' );
					$rootScope.$emit('addAction','appbar', $element); 
				}else if ($attrs.action === 'embed'){
					$element.attr('class', 'action--embed' );
					$element.appendTo( $('#'+$scope.container) );
					var css = {};
					css[$scope.x]= 16;
					css[$scope.y]= -1* ( 56/2) ;

					$element.css(css);
				}else {
					$element.attr('class', 'action--float' );
				};

				/*
					$rootScope.$on('showAction', function ( e, obj ) {

						//if ( 'action--'+obj.type !==  ) {};

						$element.attr('class', 'action--' + obj.type );

						if ( !$element.hasClass('show') )  {
							$element.css('display','block');
							$element.addClass('show');
						}
							
						$element.html(angular.element('<span class="'+ obj.icon +'"></span>'));
						$element.appendTo( obj.nodeClose );
						$element.addClass( obj.classSpecial ); 
						
					});

					$rootScope.$on('hideAction',function(e){
			 			$element.hasClass('show') ? $element.removeClass('show').addClass('hide') : $element.addClass('hide') ;
			 		});

			 		$element.on('click',function(){ 
			 			$rootScope.$emit('clickAction');
			 		});
			 	*/

			},
			compile: function(tElement, tAttrs){

				var type = tAttrs.action || 'float';

				if ( type !=='embed' && type !== 'float' ) { 
					tElement.remove();
					return $log.warn('Only can use "embed" or "float" for action '); 
				};

				

				return {
	        pre: function preLink(scope, element, attrs ) {   
 						//element.css('display','none');
	        }, 
	        post: function postLink(scope, element, attrs) {

	        }
	      };
			}
		};
	}; 

	