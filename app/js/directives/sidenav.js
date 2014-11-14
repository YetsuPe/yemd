'use strict'; 

angular.module('yemd')
	.directive('sidenav',sidenav);

function sidenav($yemd, $rootScope){
		return {
			scope: {},
			//transclude: true,
			//templateUrl: 'templates/sidenav.html',
			controller: function  ($scope, $element, $attrs, $yemd, $rootScope ){

				$yemd.sidenav.left.show = true;//show icon sidenav left
				$yemd.sidenav.right.show = true;//show icon sidenav right

				$rootScope.$on('toggleSidenav',function(e, type, toggle){ 

					if ( $attrs.sidenav === type ) { (toggle)? $element.removeClass('hide').addClass('show') : $element.removeClass('show').addClass('hide') ; }

				});

				$rootScope.$on('clickOverlay',function(e){
					if ($element.hasClass('show')) {$element.removeClass('show').addClass('hide')};
				});
				
			},
			controllerAs:'vm',
			compile: function(tElement, tAttrs){

				return {
	        pre: function preLink(scope, element, attrs, vm) {

	        	if ( element.find('.sidenav__cover') && typeof(element.find('.sidenav__cover').data('cover')) !== 'undefined'   ){
							var cover = element.find('.sidenav__cover');
		        	cover.css( 'background-image', "url('"+cover.data('cover')+"')");
	        	}
		        	
	        },  
	        post: function postLink(scope, element, attrs, vm) {

	        }
	      };
			}
		};
};
