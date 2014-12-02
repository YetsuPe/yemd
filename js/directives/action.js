
angular.module('yemd')
	.directive('action',action);

	function action($yemd, $rootScope){
		return {
			scope: {},
			controller:function($scope, $element, $attrs, $yemd, $rootScope){

				//$element.addClass( 'action--'+$yemd.action.type );
				//$element.html(angular.element('<span class="'+$yemd.action.icon+'"></span>'));
			
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

			},
			compile: function(){
				return {
	        pre: function preLink(scope, element, attrs ) {   
 						element.css('display','none');
	        }, 
	        post: function postLink(scope, element, attrs) {

	        }
	      };
			}
		};
	}; 

	