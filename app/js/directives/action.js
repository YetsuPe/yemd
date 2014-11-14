'use strict';  

angular.module('yemd')
	.directive('action',action);

	function action($yemd, $rootScope){
		return {
			scope: {},
			controller:function($scope, $element, $attrs, $yemd, $rootScope){
				$element.addClass( 'action--'+$yemd.action.type );
				$element.html(angular.element('<span class="'+$yemd.action.icon+'"></span>'));
			
				$rootScope.$on('showAction', function ( e, obj ) {
					$element.css('display','block');
					$element.attr('class', 'action--' + obj.type );
					$element.html(angular.element('<span class="'+ obj.icon +'"></span>'));
					$element.appendTo( obj.nodeClose );
					$element.addClass( obj.classSpecial );
				});

			},
			compile: function(){
				return {
	        pre: function preLink(scope, element, attrs ) {   
 						element.css('display','none');
	        }, 
	        post: function postLink(scope, element, attrs) {

 						$rootScope.$on('showAction',function(e,className){
 							element.css('display','block');
		 					element.removeClass('hide').addClass('show action--'+className);
		 				});

		 				$rootScope.$on('hideAction',function(e){
		 					element.removeClass('show').addClass('hide');
		 				});

		 				element.on('click',function(){ 
		 					$rootScope.$emit('clickAction');
		 				});

	        }
	      };
			}
		};
	}; 

	