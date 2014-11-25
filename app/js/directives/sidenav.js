'use strict'; 

angular.module('yemd')
	.directive('sidenav',sidenav);

function sidenav($yemd, $rootScope, $verge){
		return {
			scope: {},
			controller: function ($scope, $element, $attrs, $yemd, $rootScope ){

				$yemd.sidenav.left.show = true;//show icon sidenav left
				$yemd.sidenav.right.show = true;//show icon sidenav right

				$rootScope.$on('toggleSidenav',function(e, type, toggle){ 

					if ( $attrs.sidenav === type ) { 
						if ( toggle ) {
							( $element.hasClass('hide') )? $element.removeClass('hide').addClass('show') : $element.addClass('show') ;

						}else {
							( $element.hasClass('show') )? $element.removeClass('show').addClass('hide') : $element.addClass('hide') ;

						};
						 
					}

					if ( $element.hasClass('opacity') ) $element.removeClass('opacity') ;

				});

				$rootScope.$on('clickOverlay',function(e){
					if ($element.hasClass('show')) {$element.removeClass('show').addClass('hide')};
				});

				$rootScope.$on('toggleModal', function(e, toggle, html){
					if ($element.hasClass('show'))  $element.addClass('opacity');
				});

				$rootScope.$on('specialWidthSidenav', function(e, type, className){

					if ( $attrs.sidenav === type ) { 
						//if ( $ ) {
							$element.addClass( className ) ;
						//};
						 
					}
				});
				
			},
			controllerAs:'vm',
			compile: function(tElement, tAttrs){

				return {
	        pre: function preLink(scope, element, attrs, vm) {
		        	
	        },  
	        post: function postLink(scope, element, attrs, vm) {
						
						if ( element.find('.sidenav__cover') && typeof(element.find('.sidenav__cover').data('cover')) !== 'undefined'   ){
							var cover = element.find('.sidenav__cover');
		        	cover.css( 'background-image', "url('"+cover.data('cover')+"')");
	        	}
	        	
	        	//if ( element.hight() > $verge.viewportH() ) {
	        		//element.css('overflow-y', 'srool');
	        	//}

	        }
	      };
			}
		};
};

