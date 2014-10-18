(function(angular,global){ 
  'use strict';  

  /**
  * 
  * yemd Module
  *
  * Description: directives for ui inspired in material design
  */

  global.yemd = angular.module('yemd', []);

  yemd.provider('$yemd', function $yemdProvider(){

  	this.folderIcons = 'icons8/' ; //Icon's by VisualPharm

  	this.$get = ['$rootElement',function($rootElement){
      var folderIcons= this.folderIcons;

      var snackbar = angular.element("<div class='snackbar'><p></p></div>"), 
          overlay  = angular.element("<div class='overlay'></div>"),
          modal  = angular.element("<div class='modal'></div>"),
          action   = angular.element("<a class='action'><icon data-icon='plus'></icon></a>");  

      $rootElement.find('body').append( overlay );  
      $rootElement.find('body').append( modal );  
      $rootElement.find('body').append( snackbar ); 
      $rootElement.find('header').eq(0).append( action ); 

  	  return {
  	  	folderIcons: folderIcons
  	  };
  	}];

    this.setFolderIcons = function(dir){
        this.folderIcons = dir;
    };

  }); 

})(angular, window);
(function(angular, yemd){  
	'use strict';  

	action.$inject=['$rootScope', 'injectSvg', '$timeout'];

	function action($rootScope, injectSvg, $timeout){
		return {
			scope: {},  
			restrict:'C', 
			controller:function($scope,$element,$attrs,$rootScope){
				
			},
			compile: function(){
				return {
	        pre: function preLink(scope, element, attrs ) {   
 						element.css('display','none');
	        }, 
	        post: function postLink(scope, element, attrs) {

 						$rootScope.$on('showAction',function(e,className){
 							element.css('display','block');
		 					element.removeClass('hide').addClass('show action--'+className);
		 				});

		 				$rootScope.$on('hideAction',function(e){
		 					element.removeClass('show').addClass('hide');
		 				});

		 				element.on('click',function(){ 
		 					$rootScope.$emit('clickAction');
		 				});

	        }
	      };
			}
		};
	}; 

	yemd.directive('action',action);
})(angular, yemd);
(function(angular, yemd){  

	$canvas.$inject = ['$rootScope'];
	function $canvas($rootScope){
		return {
			restrict:'E',
			require: 'uiView',
			compile:function(tElement){
				return {
					pre: function preLink(scope, element, attrs) {   
		      },  
		      post: function postLink(scope, element, attrs) {   
					}
				}
			}
		};
	};

	yemd.directive('canvas',$canvas);

})(angular, yemd);
(function(angular, yemd){  
	'use strict';  

	card.$inject=['$rootScope', '$timeout'];

	function card($rootScope, $timeout){
		return {
			scope: {},  
			restrict:'EA',  
			//template:"<dl ng-repeat='(field,value) in item' ng-hide=\" field==='id' \" ><dt>{{field}}</dt><dd>{{value}}</dd></dl>",
			controller:function($scope,$element,$attrs,$rootScope){
				//$scope.hide = ()?:;
			},
			compile: function(){
				return {
	        pre: function preLink(scope, element, attrs ) {  
	        	
	        }, 
	        post: function postLink(scope, element, attrs) {
 						if ( attrs.class='card--figure' ) {
	        		var image = element.find('img').eq(0);
	        		var blockImage=angular.element("<div></div>"); 
	        		//console.log( "url('"+image.attr('src')+"'')" );
	        		blockImage.css({ 'background-image': "url('"+image.attr('src')+"')", height: element[0].clientHeight+"px" });
	        		blockImage.addClass(image.attr('class'));
	        		image.remove();
	        		element.prepend(blockImage);
	        	};
	        }
	      };
			}
		};
	}; 

	yemd.directive('yemdCard',card);

})(angular, yemd);
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
	        		if (scope.action ==='closeSidenavRight')  { $rootScope.$emit('closeSidenavRight') };
	        		if (scope.action ==='refreshState') { $rootScope.$emit('refreshState') };
	        		if (scope.action ==='back')         { $rootScope.$emit('backState') };
	        		if (scope.action ==='backSearch')   { $rootScope.$emit('removeFormSearch') };
	        		if (scope.action ==='edit')         { $rootScope.$emit('edit') };
	        		if (scope.action ==='delete')         { $rootScope.$emit('delete') };
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

						/*
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
(function(yemd){  
	'use strict'; 
	
	input.$inject=['$rootScope','$timeout'];
	function input($rootScope, $timeout){
		return {
			scope: {},
			restrict:'E', 
			require:['ngModel','?^form'] , 
			controller:  function($scope,$element,$attrs,$rootScope ){

			},
			compile: function(){
				return {
	        pre: function preLink(scope, element, attrs, requires) {   
	        	var label    = angular.element("<label class='valid'>"+attrs.placeholder+"</label>"),
            		error    = angular.element("<label class='invalid'>"+(attrs.title || 'error')+"</label>"),
            		fieldset = angular.element("<fieldset></fieldset>");
            
           		if ( attrs.type==="date" || attrs.type==="time"|| attrs.type==="datetime-local" || element[0].tagName==="SELECT" ) {
		          element.wrap(fieldset); 
		          element.parent('fieldset').addClass('focus'); 
		          element.parent('fieldset').prepend( label );
		          label.addClass('showD show');
		          element.parent('fieldset').append( error );
		       	}else if ( attrs.type==="submit" || element[0].tagName==="button" ) {
		        	element.wrap(fieldset); 
		          	element.parent('fieldset').addClass('submit'); 
		       	}else if ( attrs.special==='switch' ) {
		       		element.closest('label').wrap(fieldset);
		       		element.closest('fieldset').addClass('focus'); 
		       		element.closest('fieldset').prepend(label) ;
		       		label.addClass('showD show');
		       		requires[0]= (requires[0])? 1 : 0 ;
 				}else if ( attrs.special==='searchAppbar' ) { 

 				}else if ( attrs.special==='decoration' ) { 

 				}else{
 					element.wrap(fieldset); 
 					element.parent('fieldset').prepend(label);
            		element.parent('fieldset').append(error);
 				}

 				if ( requires[0]!=='' && attrs.type !=="submit" && attrs.special!=='switch' ) {
 					//element.closest('label').wrap(fieldset);
		       		//element.closest('fieldset').addClass('focus'); 
		       		//element.closest('fieldset').prepend(label) ;
		       		//label.addClass('showD show');
 				};
						
	        },  
	        post: function postLink(scope, element, attrs,requires) {    
	        	
		        element.on('keyup',function(){
		        	
		          if ( requires[0].$dirty ) {   
		          	element.parent('fieldset').addClass("focus");  
		            element.parent('fieldset').find('label').eq(1).removeClass('enter').addClass("leave");
		            $timeout(function(){  
		            	element.parent('fieldset').find('label').eq(1).removeClass('showD');   
		            }, 750); 
		            element.parent('fieldset').find('label').eq(0).removeClass('leave').addClass("showD enter");  
		          }

		        }); 
		        /*
		        element.on('keydown',function(event){
		        	if ( attrs.type === 'search' && event.which == 27 ) { 
		        		$rootScope.$emit('cleanFormSearch') ;
		        		$rootScope.$emit('removeFormSearch');  
		        	}
		        });
						*/
				element.on('blur',function(){ 
							
							if ( requires[0].$dirty ) {
								element.parent('fieldset').addClass("focus");
							}
								//console.log(requires[0]);
							if ( requires[0].$dirty && requires[0].$invalid ) {
								//console.log(requires[0].$error);
								if      (  requires[0].$error.required ) element.parent('fieldset').find('label').eq(1).text("Este campo es obligatorio")
								else if ( requires[0].$error.email ) element.parent('fieldset').find('label').eq(1).text( "Debe ingresar un email valido" )
								else if ( requires[0].$error.pattern ) element.parent('fieldset').find('label').eq(1).text( "el formato ingresado es incorrecto" )

								element.parent('fieldset').find('label').eq(0).removeClass('enter').addClass("leave");

		            $timeout(function(){  
		            	element.parent('fieldset').find('label').eq(0).removeClass('showD'); 
		            	element.parent('fieldset').find('label').eq(1).removeClass('leave').addClass("showD enter");
		            }, 750); 
				}
							/*	 
							if ( ngModel.$invalid ) {   
								if (ngModel.$pristine) { ngModel }; 
								console.log(ngModel);
								var result ="";
								angular.forEach(ngModel.$error, function(value,key){
			            if (key==='required') {
			              result = 'Este campo es obligatorio'; 
			            }else if (key==='pattern') {
			             	result = attrs.title ;
			            }
			          })  

								element.parent('fieldset').find('label').eq(1).text(result); 

								element.parent('fieldset').find('label').eq(0).removeClass('enter').addClass("leave"); 
								$timeout(function(){  element.parent('fieldset').find('label').eq(0).removeClass('showD');  }, 750);
								element.parent('fieldset').find('label').eq(1).removeClass("leave").addClass('showD enter');  
		          };  
		          */
						});

						
				}
	      };
			}
		};
	};
	/*
	select.$inject=['$rootScope','$timeout'];
	function select($rootScope, $timeout){
		return {
			scope: {},
			restrict:'A',
			require:['ngModel','^form'] , 
			controller:  function($scope,$element,$attrs,$rootScope ){

			},
			compile: function(){
				return {
	        pre: function preLink(scope, element, attrs, requires) {   
	        	var label    = $rootScope.element("<label class='valid'>"+attrs.placeholder+"</label>"),
            		error    = $rootScope.element("<label class='invalid'>"+(attrs.title || 'error')+"</label>"),
            		fieldset = $rootScope.element("<fieldset></fieldset>");
 
		          element.wrap(fieldset); 
		          element.parent('fieldset').addClass('focus'); 
		          element.parent('fieldset').prepend( label );
		          label.addClass('showD show'); 

	        },  
	        post: function postLink(scope, element, attrs,requires) {    

	        		

		        element.on('keyup',function(){
		        	if ( requires[0].$dirty ) { element.closest('fieldset').addClass("focus"); }
		        	
		          if ( requires[0].$dirty ) {    
		            element.closest('fieldset').find('label').eq(1).removeClass('enter').addClass("leave");
		            $timeout(function(){  
		            	element.closest('fieldset').find('label').eq(1).removeClass('showD');   
		            }, 750); 
		            element.closest('fieldset').find('label').eq(0).removeClass('leave').addClass("showD enter");  
		          }
		        });  
						element.on('blur',function(){ 
							if ( requires[0].$dirty ) {
								element.closest('fieldset').addClass("focus");
							}
								//console.log(requires[0]);
							if ( requires[0].$dirty && requires[0].$invalid ) {
								if      (  requires[0].$error.required ) element.closest('fieldset').find('label').eq(1).text("Este campo es obligatorio")
								else if ( requires[0].$error.pattern ) element.closest('fieldset').find('label').eq(1).text( attrs.title )

								element.closest('fieldset').find('label').eq(0).removeClass('enter').addClass("leave");

		            $timeout(function(){  
		            	element.closest('fieldset').find('label').eq(0).removeClass('showD'); 
		            	element.closest('fieldset').find('label').eq(1).removeClass('leave').addClass("showD enter");
		            }, 750); 
		             
							} 
						});

						
				  }
	      };
			}
		};
	};
	*/
	yemd.directive('input',input);
	//yemd.directive('textarea',input);
	//yemd.directive('yemdSelect',select);
})(yemd);


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
(function(yemd){  
	'use strict'; 
	yemd.directive('overlay',overlay);

	function overlay($rootScope){
		return {
			scope: {},
			restrict:'C',
			controller: function($scope){
				$scope.toggle=false;
			},   
			compile: function(){
				return {
	        pre: function preLink(scope, element, iAttrs) {   
	        },  
	        post: function postLink(scope, element, iAttrs) { 

	        	function toggleOverlay(){
	        		element.hasClass('show')? element.removeClass('show').addClass('hide'):element.removeClass('hide').addClass('show'); 
	        	}

	        	$rootScope.$on('changeModal', function(){
	        		//toggleOverlay();
						})

						$rootScope.$on('changeSidenavLeft', function(event) { 
							toggleOverlay();
				   	}); 
				   	
				   	$rootScope.$on('changeSidenavRight', function(event) { 
				   		toggleOverlay();
				   	}); 

				   	element.on('click',function(){ 
				   		$rootScope.$emit('closeSidenav'); 
				   		element.removeClass('show').addClass('hide'); 
				   	});
				  }
	      };
			}
		};
	};

})(yemd);


(function(yemd){  
	'use strict'; 
	
	sidenav.$inject=['$rootScope', '$window', '$verge', '$document'];
	function sidenav($rootScope,$window,$verge,$document){
		return {
			scope: { 
				type:'@', // left, right
				isAppbar: '@'
			},
			restrict:'AEC',  
			controller: function  ($scope, $element, $attrs,$rootScope,$verge,$document ){
				var vm = this;
				vm.type = $scope.type || 'left';
				vm.className= 'sidenav--'+vm.type ; 

				vm.getHeightSidenav=  function(element){
					var height = 50;//(vm.type==='left')? vm.getHeightToHeadValue() + element.children('section')[0].clientHeight: $element.children('section')[0].clientHeight ;  
					//console.log( $verge.viewportH() , vm.getHeightToHeadValue(), element.children('section').eq(0).height() );
					return ($verge.viewportH() > height )? { 'height':'100%' } : {'height': (vm.getHeightToHeadValue() + height) +'px', 'overflow-y': scroll };
				}; 
				vm.getHeightToHeadValue= function(){ 
					return $verge.viewportW() < 320? ($verge.viewportW() - 56)*(9/16)    : 264*(9/16) ;
				};
				vm.getHeightToHead= function(){   
					return { 'height': vm.getHeightToHeadValue() +"px" };
				}; 

			},
			controllerAs:'vm',
			compile: function(tElement, tAttrs){

				return {
	        pre: function preLink(scope, element, attrs, vm) {   
	          element.addClass(vm.className); 
	        	element.find('figure').css( vm.getHeightToHead() );

	        },  
	        post: function postLink(scope, element, attrs, vm) {

	        	element.css( vm.getHeightSidenav(element) );

	        	/*
	        	element.find('a').on('click',function(e){
	        		e.preventDefault();
	        		$rootScope.$emit('changeSidenavLeft'); 
	        	});
						*/
	        	
	        	$rootScope.$on('changeSidenavLeft', function(event) { 
	        		if ( scope.type === "left" ) {
	        			element.hasClass('show')  ? element.removeClass('show').addClass('hide'):element.removeClass('hide').addClass('show'); 
	        		};
				   	});
	        	$rootScope.$on('changeSidenavRight', function(event) { 
	        		if ( scope.type === "right" ) {
	        			element.hasClass('show')  ? element.removeClass('show').addClass('hide'):element.removeClass('hide').addClass('show'); 
	        		};
				   	});

	        	$rootScope.$on('closeSidenav', function(event) { 
	        		if ( scope.type === "left" ) {
	        			if ( element.hasClass('show') ) { element.removeClass('show').addClass('hide'); } ; 
	        		}else if(scope.type === "right"){
	        			if ( element.hasClass('show') ) { 
	        				$rootScope.$emit('closeSidenavRight'); 
	        				element.removeClass('show').addClass('hide'); 
	        			} ; 
	        		};
	        	});



	        	//responsive
	        	$window.onresize= function(event){   
	        		element.find('figure').css( vm.getHeightToHead() );
	        	};

	        }
	      };
			}
		};
	};

	yemd.directive('sidenav',sidenav);

})(yemd);


(function(angular, yemd){ 
  
	yemd
	.directive('snackbar',['$rootScope','$timeout', function($rootScope,$timeout){
    return {
      restrict: 'AC',
      scope:{}, 
      compile:function(){
      	return {
      		post: function postLink(scope,element,attrs){

      			$rootScope.$on('showSnackbar',function(event,message){
		      		console.log(message);
		      		element.removeClass('hide').addClass('show'); 
		      		element.find('p').text(message);  
		      		$timeout(function(){
		      			element.removeClass('show').addClass('hide'); 
		      		}, 1750); 
		      	});

      		}
      	}
      } 
    };
  }]) 
})(angular,yemd);
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


(function(angular, yemd, svg){  
 'use strict'; 
	yemd.factory('injectSvg', ['$yemd', function($yemd){
		return function(iconName,toElement){   
			toElement.append( angular.element("<img src='"+ $yemd.folderIcons + iconName + ".svg' />") ); 
			return svg( toElement.find('img') );  
		};
	}]);

})(angular, yemd, SVGInjector);
(function(yemd, verge){  
	
	'use strict'; 
	yemd.service('$verge', [ function() {
		return verge;
	}]); 
	
})(yemd, verge);