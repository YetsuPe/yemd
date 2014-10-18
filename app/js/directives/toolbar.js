(function(yemd){  
	'use strict'; 
	
	toolbar.$inject=['$rootScope','$compile'];

	function toolbar($rootScope,$compile){
		return {
			scope: {
				type:'@', //extend,normal
				isAppbar: '@'
			}, 
			restrict:'EC', 
			controller: function  ($scope, $element, $attrs,$rootScope){
				var vm= this;
				vm.isAppbar= ($scope.isAppbar !== undefined) ? true : false ;
				vm.type= $scope.type || 'default'; 
			},
			controllerAs:'toolbarController',
			compile: function(){
				return {
	        pre: function preLink(scope, element, iAttrs, toolbarController) {  
	        	element.addClass('toolbar--'+toolbarController.type);  
	        }, 
	        post: function postLink(scope, element, iAttrs, toolbarController) {

	        	$rootScope.$on('changeTitleAppbar',function(event,newTitle){ 
	        		if ( scope.isAppbar!== undefined ) { element.find('h1').text(newTitle);  };
	        	});
	        	
	        	$rootScope.$on('changeAppbar', function(e,className){ 
	        		element.attr('class', 'toolbar--'+className);
						});

	        	/*
	        	$rootScope.$on('injectIcon', function(event,icon,action){ 
	        		var linkIcon = $compile(icon); 
	        		scope.search = action;
              linkIcon(scope); 
	        		element.find('icon').eq(0).after(icon) 
	        	});
	        	/*
	        	$rootScope.$on('injectActionNew', function(event,icon,action,node){ 
	        		var linkIcon = $compile(icon); 
	        		scope.actionNew = action;
              linkIcon(scope);
              node.append(icon).addClass('show') ;
	        	});
						*/
	        	
	        	/*
	        	$rootScope.$on('showActionNew', function(e,menu,stateName){ 
	        		angular.forEach(menu, function(value,index){
	        			if ( value.nombre===stateName ) {  
	        				var className=( element.hasClass('toolbar--default') )? 'float' : 'embed' ;
	        				this.append( $rootScope.element( "<a class='action--"+className+"'> </a>"   ) );
	        				var node = element.find('a').eq(-1);
	        				var icon = $rootScope.$emit('injectActionNew', angular.element("<icon data-src='actionNew' ui-sref='^.new'> </icon>"), {icon:'plus', involve:'actionNew' },node );
	        				//this.append( $rootScope.element( "<a class='action--"+className+"'> "+icon+" </a>"   ) );
	        			};
	        		}, element);
	        	});
						*/
	        	$rootScope.$on('hideActionNew', function(e,menu){
	        		element.find('a').removeClass('show').addClass('hide');
	        	});
						
	        }
	      };
			}
		};
	};

	yemd.directive('toolbar',toolbar);

})(yemd);
