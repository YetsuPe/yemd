(function(yemd){  
	'use strict'; 
	yemd.directive('modal',modal);

	function modal () {

	return {
		scope: {},
		restrict: 'A',
		//template: "<div class='morph-button morph-button-modal morph-button-modal-1 morph-button-fixed'>{{content}}</div>",
		controller: function($scope, $element, $rootScope){
			$element.wrap( angular.element( "<div class='modal'> ddd {{ content }} </div>" )  )
			
			$rootScope.$on('changeModal', function(){
				
			})
		},
		compile: function(tElement, tAttrs){

			return {

			}
		}
	}
}

})(yemd);