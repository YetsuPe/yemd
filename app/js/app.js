(function(){

	'use strict';

	angular.module('app',['yemd', 'ui.router'])

		.config( routes );


	function yemdCtrl($scope, $rootScope){

	  $scope.openBottomSheet= function() {
	  	
	    $rootScope.$emit('toggleBottomSheet', 'bsList', true);
	  };

	}

	function routes ( $stateProvider, $urlRouterProvider ) {

		$urlRouterProvider 
	    .rule(function ($injector, $location) {
	      var path = $location.path(),
	          normalized = path.toLowerCase();
	      if (path !== normalized) {
	        return normalized;
	      }
	  	}).otherwise('/');

	  $stateProvider
			.state('404',{
	      url:'/404',
	      templateUrl:'js/components/views/404.html',
	      controller: ['$scope','$rootScope', '$state',function($scope,$rootScope, $state){ 
	        var vm = this; 
	        $rootScope.$emit('changeTitleAppbar', '404 Error' );
	        $rootScope.$emit('changeAppbar', 'default' );
	      }],
	      controllerAs:'vm'
	  	});

		$stateProvider

      .state('home',{
        url:'/',
        views: {
          '': {
          	templateUrl: 'views/home.html'
          }
        }
            
      });

	}

}());