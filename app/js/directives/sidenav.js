

angular.module('yemd')
	.directive('sidenav',sidenav);

function sidenav($yemd, $rootScope){
		return {
			scope: {},
			controller: function ($scope, $element, $attrs, $yemd, $rootScope ){

				$element.attr('class','sidenav--'+$attrs.sidenav);

				$rootScope.$on('toggleSidenav',function(e, name, toggle){ 

					if ( $attrs.sidenav === name ) { 
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

				$rootScope.$on('specialWidthSidenav', function(e, name, className){

					if ( $attrs.sidenav === name ) { $element.addClass( className ) ; }

				});

				$rootScope.$on('resetSpecialWidthSidenav', function(e, name){

					if ( $attrs.sidenav === name ) { $element.attr('class', $scope.defaultClassName ) ; }
					
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
	        	};

	        	element.find('.sidenav__content__link').on('click', function(){
	        		console.log('click');
	        		$rootScope.$emit('toggleSidenav', attrs.sidenav, false);
	        	});
	        	
	        	//if ( element.hight() > $verge.viewportH() ) {
	        		//element.css('overflow-y', 'srool');
	        	//}

	        }
	      };
			}
		};
};

