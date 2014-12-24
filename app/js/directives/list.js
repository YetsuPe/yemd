
angular.module('yemd')
	.directive('list',list);

function list( $rootScope, $compile, $timeout){

	return function link ( scope, element, attrs ){
		var type = '--'+attrs.list || '';
		element.addClass('list'+ type);

		$rootScope.$on('resizeWindow', function(e) {

		});

	}

}