'use strict'; 
	angular.module('yemd')
		.directive('modal',modal);

	function modal () {

	return {
		scope: {

		},
		restrict: 'C',
		//template: "jojo ds dfsfsfsfsffsj",
		controller: function($scope, $element, $rootScope, $compile){
			//$element.wrap( angular.element( "<div class='modal'> ddd {{ content }} </div>" )  )
			
			$rootScope.$on('toggleModal', function(e, toggle, html){
				//$rootScope.$emit('toggleOverlay', toggle);
				if (toggle) {
					$element.addClass('show');
					$element.html(html);

				}
			});

			$rootScope.$on('clickOverlay',function(e){
				if ($element.hasClass('show')) {$element.removeClass('show')};
			});

		},
		compile: function(tElement, tAttrs){

			return {

			}
		}
	}
}