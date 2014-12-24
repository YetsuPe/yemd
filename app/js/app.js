(function(){

	'use strict';

	angular.module('app',['yemd', 'ui.router'])

		.config( routes )
		.run(run);

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
	      templateUrl:'js/views/404.html',
	      controller: function($scope,$rootScope, $state){ 

	        $rootScope.$emit('changeTitleToolbar', 'appbar', '404 Error' );
	        $rootScope.$emit('changeAppbar','appbar' , 'default' );

	      }

	  	})

      .state('home',{
        url:'/',
        views: {
          '': {
          	templateUrl: 'views/home.html'
          }
        }
            
      })

      .state('cards',{
        url:'/cards',
        views: {
          '': {
          	templateUrl: 'views/cards.html'
          }
        }
            
      })

      .state('lists',{
        url:'/lists',
        views: {
          '': {
          	templateUrl: 'views/lists.html'
          }
        }
            
      })

      .state('buttons',{
        url:'/buttons',
        views: {
          '': {
          	templateUrl: 'views/buttons.html'
          }
        }
            
      });

	}

	function run ( $rootScope, $yemd ) {
		console.log('run');

		$rootScope.app = {};

		$rootScope.ui = {
			icons: {
				appbarLeft : { 
					show: true, 
					icon: 'mdfi_navigation_menu',
					click: function(e){ $yemd.toggleSidenav('left', true); }
				},
				appbarRight : { 
					show: true, 
					icon: 'mdfi_navigation_menu',
					click: function(e){ $yemd.toggleSidenav('right', true); }
				},
				toolbarRight1 : { 
					show: true, 
					icon: 'mdfi_navigation_menu',
					click: function(e){ $yemd.toggleSidenav('right', false); }
				}
			}
		};

		$rootScope.$on('$stateChangeStart', function(evt, toState, toParams, fromState, fromParams) { 
			console.log('remove action');
			$rootScope.$emit('removeAction','appbar'); 

	  });

	}

}());