	'use strict';  

	icon.$inject=['$rootScope', 'injectSvg', '$timeout','$rootElement','$compile'];
	function icon($rootScope, injectSvg, $timeout,$rootElement,$compile){
		return {
			scope: {
				icon: '@' ,
				action:'@',
				search:'='
			}, 
			restrict:'EC', 
			compile: function(){
				return {
	        pre: function preLink(scope, element, attrs) {  
	        	element.append( injectSvg( scope.icon, element) ); 
	        	element.prepend(angular.element("<span class='ripple--radial'></span>")); 
	        }, 
	        post: function postLink(scope, element, attrs) {
	        	
	        	function clickTouch (e){ 
	        		if (scope.action ==='sidenavLeft')  { $rootScope.$emit('changeSidenavLeft') };
	        		if (scope.action ==='refreshState') { $rootScope.$emit('refreshState') };
	        		if (scope.action ==='back')         { $rootScope.$emit('backState') };
	        		if (scope.action ==='backSearch')   { $rootScope.$emit('removeFormSearch') };
	        		if (scope.action ==='edit')         { $rootScope.$emit('editState') };
	        		if (scope.action ==='search') {  
	        			var searchForm= angular.element("<form name='form' novalidate><input type='search' autofocus placeholder='Buscar...' data-special='searchAppbar' ng-model='search' name='search'/></form>")  ;
		        		$compile(searchForm)(scope); 
 								$rootElement.find('header').prepend(searchForm); 
 								$rootElement.find('header').find('form').find('input').eq(0).focus(); 
	        			$rootScope.$emit('changeIcon',{oldAction:'sidenavLeft', newAction:'backSearch', newIcon:'arrow-left'}); 
	        		};

							var ripple = element.find('span');
							$timeout(function(){ ripple.removeClass('show').addClass('show'); } ,50); 
					    $timeout(function(){ ripple.removeClass('show'); } ,700);
						}

        		//element.on('touchstart',clickTouch );
	        	element.on('click',clickTouch);
	        	/*
	        	$rootScope.$on('changeIcon',function(e,data){
	        		if (scope.action === data.oldAction) {
	        			scope.action = data.newAction ;
	        			scope.icon   =data.newIcon; 
	        			
	        			element.find('svg').remove();
	        			element.append( injectSvg( scope.icon, element) ); 
	        		};
	        	});

 						$rootScope.$on('removeFormSearch',function(){  
 							$rootScope.$emit('cleanFormSearch');  
		          $rootElement.find('header').children('form').remove();  
		          $rootScope.$emit('changeIcon',{oldAction:'backSearch', newAction:'sidenavLeft', newIcon:'menu'});  
 						});
 						$rootScope.$on('removeIconSearch',function(){   
		          angular.forEach($rootElement.find('header').children('icon'), function(value, index){
		          	if ( $rootScope.element(value).data('action')==='search' ) {  $rootScope.element(value).remove() };
		          });   
 						});
 						$rootScope.$on('removeIconEdit',function(){   
		          angular.forEach($rootElement.find('header').children('icon'), function(value, index){
		          	if ( $rootScope.element(value).data('action')==='edit' ) {  $rootScope.element(value).remove() };
		          });   
 						});
						*/
	        }
	      };
			}
		};
	}; 

	angular.module('yemd').directive('icon',icon);