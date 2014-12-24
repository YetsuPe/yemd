

angular.module('yemd')
	.directive('sidenav',sidenav);

function sidenav( $rootScope, $compile, $timeout){

	return function link (scope, element, attrs) {

		var type = attrs.sidenav || 'left',
				overlay = angular.element('<div data-overlay></div>'),
				defaultClassName = attrs.class,
				toggleSidenav = function(toggle){

					if ( toggle  ) { 

						$compile( overlay )(scope);
						$rootScope.$emit('toggleOverlay', true);
						element.after(overlay);

						( element.hasClass('hide') )? element.removeClass('hide').addClass('show') : element.addClass('show') ;
						 
					} else {
						
						( element.hasClass('show') )? element.removeClass('show').addClass('hide') : element.addClass('hide') ;
						$rootScope.$emit('toggleOverlay', false);
						$timeout(function(){
							overlay.remove();
						}, 750);

					}

				};

		element.attr('class','sidenav--'+ type);

		element.find('.sidenav__cover').css( 'background-image', "url('"+element.find('.sidenav__cover').data('cover')+"')");

		element.find('.sidenav__content__link').on('click', function(){
			toggleSidenav(false);
	    $rootScope.$emit('toggleSidenav', attrs.sidenav, false);
	  });

		$rootScope.$on('toggleSidenav', function(e, name, toggle){ if ( attrs.sidenav === name ) { toggleSidenav(toggle); } });

	  $rootScope.$on('clickOverlay', function(e){ if (element.hasClass('show')) {element.removeClass('show').addClass('hide')}; });

	  $rootScope.$on('specialWidthSidenav', function(e, name, className){ if ( attrs.sidenav === name ) { element.addClass( className ) ; } });

		$rootScope.$on('resetSpecialWidthSidenav', function(e, name){ if ( attrs.sidenav === name ) { element.attr('class', defaultClassName) ; } });

	};

};

