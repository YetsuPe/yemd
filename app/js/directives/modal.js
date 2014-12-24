
	angular.module('yemd')
		.directive('modal',modal);

	function modal () {

	return {
		scope: {},
		restrict: 'C',
		controller: function($scope, $element, $rootScope, $compile){

			$rootScope.$on('toggleModal', function(e, toggle, html){
				$rootScope.$emit('toggleOverlay', toggle);
				$element.html(html);

				if (toggle) { if (!$element.hasClass('show')) {$element.addClass('show')};
				} else { if ($element.hasClass('show')) {$element.removeClass('show')}; }

			});

			$rootScope.$on('clickOverlay',function(e){
				if ($element.hasClass('show')) {$element.removeClass('show')};
			});

		}
	}
}