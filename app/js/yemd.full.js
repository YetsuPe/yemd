angular.module('yemd', []);

angular.module('yemd')
  .provider('$yemd', $yemdProvider )
  .run(initYemd);

function $yemdProvider(){

  var isWebPageTo = false,
      isWebPageMobile = false,
      forceYemd = false,
      webPageStartMQ = 1024;
      leaveBehaviorComponents = [];

  this.setWebPage = function(band){ isWebPageTo = band; };
  this.setWebPageMobile = function(band){ isWebPageMobile = band };
  this.setWebPageStartMQ = function(bp){ webPageStartMQ = bp; };
  this.setLeaveBehaviorComponents = function(components){ leaveBehaviorComponents = components; };

  this.$get = ['$rootScope', '$verge', function($rootScope, $verge){

    return { 
      
      mqMedium: 768,
      mqLarge: 1200,

      
      classMaster: 'yemd', 
      forceYemd: forceYemd, // default : false

      //Usefull  for hibrid apps
      webPage: isWebPageTo, // default : false
      webPageMobile: isWebPageMobile,
      webPageStartMQ: webPageStartMQ,
      webPageClass: 'no-yemd',
      leaveBehaviorComponents: leaveBehaviorComponents,

      //Toolbar
      toolbarIsExtend: false,

      viewportW : function() { return $verge.viewportW(); } ,
      viewportH : function() { return $verge.viewportH(); } ,

      //function 
      toggleSidenav: function( sidenav, toggle ){ $rootScope.$emit('toggleSidenav', sidenav, toggle); }
    };

  }]

}

function initYemd ( $yemd, $rootScope, checkVersionApp, $window ) {

  checkVersionApp();

  $rootScope.$on('resizeWindow', function(e){

    checkVersionApp();

  });

  $window.onresize = function(event) {
    $rootScope.$emit('resizeWindow');
  }

}
initYemd.$inject = ['$yemd', '$rootScope', 'checkVersionApp', '$window'];



angular.module('yemd')
	.directive('action',action);

	function action($yemd, $rootScope, $log){
		return {
			scope: {
				container: '@',
				x:'@', // left, right
				y: '@' //	top, bottom
			},
			controller:['$scope', '$element', '$attrs', '$yemd', '$rootScope', function($scope, $element, $attrs, $yemd, $rootScope){

				if ( $scope.container ==='appbar' ) {
					$element.attr('class', 'action' );
					$rootScope.$emit('addAction','appbar', $element); 
				}else if ($attrs.action === 'embed'){
					$element.attr('class', 'action--embed' );
					$element.appendTo( $('#'+$scope.container) );
					var css = {};
					css[$scope.x]= 16;
					css[$scope.y]= -1* ( 56/2) ;

					$element.css(css);
				}else {
					$element.attr('class', 'action--float' );
				};

				/*
					$rootScope.$on('showAction', function ( e, obj ) {

						//if ( 'action--'+obj.type !==  ) {};

						$element.attr('class', 'action--' + obj.type );

						if ( !$element.hasClass('show') )  {
							$element.css('display','block');
							$element.addClass('show');
						}
							
						$element.html(angular.element('<span class="'+ obj.icon +'"></span>'));
						$element.appendTo( obj.nodeClose );
						$element.addClass( obj.classSpecial ); 
						
					});

					$rootScope.$on('hideAction',function(e){
			 			$element.hasClass('show') ? $element.removeClass('show').addClass('hide') : $element.addClass('hide') ;
			 		});

			 		$element.on('click',function(){ 
			 			$rootScope.$emit('clickAction');
			 		});
			 	*/

			}],
			compile: function(tElement, tAttrs){

				var type = tAttrs.action || 'float';

				if ( type !=='embed' && type !== 'float' ) { 
					tElement.remove();
					return $log.warn('Only can use "embed" or "float" for action '); 
				};

				

				return {
	        pre: function preLink(scope, element, attrs ) {   
 						//element.css('display','none');
	        }, 
	        post: function postLink(scope, element, attrs) {

	        }
	      };
			}
		};
	}
	action.$inject = ['$yemd', '$rootScope', '$log'];; 

	
angular.module('yemd')
	
	.directive('bottomSheet', bottomSheet);

function bottomSheet ($rootScope) {


	return {
		scope : {
			name:'=',
			type: '@'
		},
		controller: ['$scope', '$attrs', '$element', '$rootScope', function($scope, $attrs, $element, $rootScope){
			
			$element.addClass('bottom-sheet--'+$scope.type+" hide");

			$rootScope.$on('toggleBottomSheet', function(e, name, toggle){

					if ( $attrs.bottomSheet === name ) { 
						if ( toggle ) {
							( $element.hasClass('hide') )? $element.removeClass('hide').addClass('show') : $element.addClass('show') ;

						}else {
							( $element.hasClass('show') )? $element.removeClass('show').addClass('hide') : $element.addClass('hide') ;

						};
						 
					}


			});

		}]
	};

}
bottomSheet.$inject = ['$rootScope'];


angular.module('yemd')
	.directive('canvas', canvas);

	function canvas($rootScope, checkWebpage, $yemd, $window){
		var componentName = 'canvas';
		return {
			scope:{
				name: '@'
			},
			restrict: 'C',
			controller: ['$scope', '$element', '$attrs', '$rootScope', 'checkWebpage', '$yemd', '$window', function($scope, $element, $attrs, $rootScope, checkWebpage, $yemd, $window){

				$element.attr('class','canvas--default');

				var canvas = this;

				canvas.resizeWindow =function() {

					if ( !checkWebpage(componentName) ) { return false; };

					if ( $yemd.viewportW() >= $yemd.mqMedium) {

						if ( $yemd.toolbarIsExtend  ) { 
							$element.removeClass('canvas--block').addClass('canvas--default');
						}else {

							$rootScope.$emit('changeTypeToolbar','appbar', '2rows');
							$element.removeClass('canvas--default').addClass('canvas--block');
						};
						
					} else {
						if ( !$yemd.toolbarIsExtend  ) { 
							$rootScope.$emit('changeTypeToolbar','appbar', 'default');
						}
						$element.removeClass('canvas--block').addClass('canvas--default');
						
					}

				}

				canvas.resizeWindow();

				$rootScope.$on('resizeWindow', function(e){
					canvas.resizeWindow();
				});

				$rootScope.$on('toolbarIsExtend', function(e){
					canvas.resizeWindow();
				});

			}]
		}
	}
	canvas.$inject = ['$rootScope', 'checkWebpage', '$yemd', '$window'];


angular.module('yemd')
		.directive('card',card);

function card($rootScope, $yemd, checkWebpage){
	var componentName = 'card';
	return {
		scope: {

		},
		controller: ['$element', '$attrs', '$yemd', 'checkWebpage', function($element, $attrs, $yemd, checkWebpage){

			var type = ($attrs.card==='')?'':'--'+$attrs.card;
			$element.addClass('card'+type);

			this.figures = function (marginPics) {

				if ( !checkWebpage(componentName) ) { return false; };

	    	$element.find('.card__content').children('div').remove(); //reset
	    	$element.find('.card__content').css('display', 'flex'); 

	    	var pics = $element.find('img');
	    	var widthContainer = $element.find('.card__content').width() - marginPics ;
	    	var row = parseInt($element.data('columns')) || 3 ; //default 3 columns

	    	angular.forEach( pics , function(value, index){

	    		var image = $('<div> <span>'+ $(value).attr('alt') +'</span> </div>');

	    		image.css({
	    			backgroundImage: 'url('+$(value).attr('src')+')',
	    			backgroundSize: 'cover',
	    			width : ( widthContainer / row ) + 'px',
	    			height: ( widthContainer / row ) + 'px'
	    		});

	    		$element.find('.card__content').append( image )  ;
	    		
	    	});

	    	$element.find('img').hide();
	    }

	    this.cover = function() {

	    	if ( !checkWebpage(componentName) ) { return false; };
	    	console.log($element.width());
	    	$element.find('.card__cover').css({
	    		height: $element.width() * (9/16),
	    		backgroundSize: 'cover',
					'background-image': "url('"+ $element.find('.card__cover__image').attr('src')+"')" 
				});
				$element.find('.card__cover__image').hide();
	    }

	    this.avatar = function(){

	    	if ( !checkWebpage(componentName) ) { return false; };

	    	$element.find('.card__photo').css({ 
	    		backgroundSize: 'cover',
	    		backgroundImage: "url('"+ $element.find('.card__photo__image').attr('src')+"')"  
	    	});

	    	$element.find('.card__photo__image').hide();
	    }
	    
		}],
		link: function (scope, element, attrs, cardCtrl ) {

	    if ( attrs.card === 'square-picture' ) {
	      element.css({
					'background-image': "url('"+ element.find('.card__cover__image').attr('src')+"')" 
				});
	    };

	    if ( attrs.card === 'figures' ) { cardCtrl.figures(24); };

	    if ( attrs.card === 'cover' ) { cardCtrl.cover(); };

	    if ( attrs.card === 'figure' ) { cardCtrl.cover(); };

	    if ( attrs.card === 'avatar' ) { cardCtrl.avatar(); };

	    $rootScope.$on('resizeWindow', function(e) {
        if ( attrs.card === 'figures' ) { cardCtrl.figures(8); };
        if ( attrs.card === 'cover' || attrs.card === 'figure'  ) { cardCtrl.cover(); };
        if ( attrs.card === 'avatar' ) { cardCtrl.avatar(); };
      });
						
	  }
	}
}
card.$inject = ['$rootScope', '$yemd', 'checkWebpage'];; 


angular.module('yemd')
	.directive('icon', icon);

	function icon($rootScope, $log){
		return {
			scope:{
				icon: '='
			},
			controller: ['$scope', '$element', '$attrs', '$rootScope', '$log', function($scope, $element, $attrs, $rootScope, $log){

				if ( typeof($scope.icon) === 'undefined' || typeof($scope.icon) !== 'object' ) {
					return $log.warn( "Shoud pass an object to the icon directive"," (Type: "+ typeof($scope.icon)+')' );
				}

				$element.on('click', function(event){ 
					if ( typeof( $scope.icon.click ) === 'function'  ) { $scope.icon.click(event) ; };
				});
				
				$scope.$watch('icon.icon', function(){ $element.attr('class', $scope.icon.icon || 'mdfi_image_timer_auto' );});
				
				$scope.$watch('icon.show', function(){ 
					if ( typeof($scope.icon.show) === 'undefined' ) { $scope.icon.show = true };
					if ( $scope.icon.show && $element.hasClass('hide') ){ $element.removeClass('hide'); }
					if ( !$scope.icon.show && !$element.hasClass('hide') ) { $element.addClass('hide'); };
				});

			}]
		}
	}
	icon.$inject = ['$rootScope', '$log'];


angular.module('yemd')
	.directive('input',input)
	.directive('textarea', textarea)
	.directive('yemdSelecto', select);

	function input($rootScope, $timeout, $compile){
		return {
			scope: {
				hide: '='
			},
			restrict:'E', 
			require:['?ngModel','?^form'] , 
			controller:  ['$scope', '$element', '$attrs', '$rootScope', function($scope,$element,$attrs,$rootScope ){
				/*
				$scope.$watch('hide', function(){
	        $scope.hide?$element.closest('.wrapper').addClass('hide'):$element.closest('.wrapper').removeClass('hide');
	      });
				*/
			}],
			compile: function(tElement, tAttrs){
				return {
	        pre: function preLink(scope, element, attrs, requires ) { 

	        	var label   = angular.element("<label class='valid'>"+attrs.placeholder+"</label>"),
            		error   = angular.element("<label class='invalid'>"+(attrs.error || 'error')+"</label>"),
            		wrapper = angular.element('<div class="wrapper"></div>') ;

            element.attr('placeholder', '');

		 				if ( attrs.type==="range" || attrs.type==="color" ) { 
		 					element.wrap(wrapper); 
		 					element.parent('.wrapper').prepend(label);
		 					element.parent('.wrapper').addClass('open');
		 				}else if(attrs.type==="date" || attrs.type==="month"|| attrs.type==="week" || attrs.type==="time" || attrs.type==="datetime" || attrs.type==="datetime-local"   ){
		 					element.wrap(wrapper); 
		 					element.parent('.wrapper').prepend(label);
		 					element.parent('.wrapper').addClass('open--all');
		 				}else if(attrs.type==="submit" || element[0].tagName==="button" || attrs.type==="file" ){

		 				}else if( attrs.type==="radio" ){
		 								
		 					element.wrap( angular.element("<div class='checkbox'></div>") ); 
					 		//element.prependTo( element.closest('.checkbox') );
					 		element.closest('.checkbox').append(angular.element("<div class='check'><div class='inside'></div></div><label> "+element.data('option')+" </label>"));

		 				}else if( attrs.type==="checkbox" ){
		 					element.wrap( angular.element("<label class='switch switch-green'></label>") ); 
		 					element.addClass('switch-input');
		 					element.after( angular.element("<span class='switch-track'></span><span class='switch-thumb'></span>") );

		 					element.parent('label').wrap(wrapper); 
		 					element.parent('label').parent('.wrapper').prepend(label);
		 					element.parent('label').parent('.wrapper').addClass('open');

		 				} else{
		 					element.wrap(wrapper); 
		 					element.parent('.wrapper').prepend(label);
		          element.parent('.wrapper').append(error);
		 				}

		 				//if ( scope.hide ) {
		 					//element.closest('.wrapper').css('display', 'none');
		 				//}

	        },  
	        post: function postLink(scope, element, attrs,requires) {    


		 				element.on('change', function () {

		 					if (attrs.type==="file"){
		 						scope.$apply(function () {
				          requires[0].$setViewValue( element.val() );
				        });
		 					}
				        
				    }); 

		 				element.on('focus',function(){
		 					element.parent('.wrapper').addClass("focus current");
		 				});

		 				/*
		        element.on('keyup',function(){
		        	
		          if ( requires[0].$dirty ) {   
		          	element.parent('.wrapper').addClass("focus");  
		            element.parent('.wrapper').find('label').eq(1).removeClass('enter').addClass("leave");
		            $timeout(function(){  
		            	element.parent('.wrapper').find('label').eq(1).removeClass('showD');   
		            }, 750); 
		            element.parent('.wrapper').find('label').eq(0).removeClass('leave').addClass("showD enter");  
		          }

		        }); 
						*/
						element.on('blur',function(){ 
							element.parent('.wrapper').removeClass("current");
							if ( requires[0].$pristine ) { element.parent('.wrapper').removeClass("focus"); }
 							//console.log(requires[0]);
 							/*
							if ( requires[0].$dirty && attrs.type!=="range" ) {
								if( !element.parent('.wrapper').hasClass("focus") ) {element.parent('.wrapper').addClass("focus");};
								element.parent('.wrapper').find('label').eq(0).removeClass('leave').addClass("showD enter");
							}

							if ( requires[0].$dirty && requires[0].$invalid ) {

								
								if ( requires[0].$error.email ) element.parent('.wrapper').find('label').eq(1).text( "Debe ingresar un email valido" )
								else if ( requires[0].$error.number ) element.parent('.wrapper').find('label').eq(1).text( "El campo solo acepta números" )
								else if ( requires[0].$error.tel ) element.parent('.wrapper').find('label').eq(1).text( "Ingrese un número teléfonico" )
								else if ( requires[0].$error.pattern ) element.parent('.wrapper').find('label').eq(1).text( attrs.title || "el formato ingresado es incorrecto" )
								else if ( requires[0].$error.required ) element.parent('.wrapper').find('label').eq(1).text("Este campo es obligatorio");
								
								element.parent('.wrapper').find('label').eq(0).removeClass('enter').addClass("leave");

		            $timeout(function(){  
		            	element.parent('.wrapper').find('label').eq(0).removeClass('showD'); 
		            	element.parent('.wrapper').addClass('error');
		            	element.parent('.wrapper').find('label').eq(1).removeClass('leave').addClass("showD enter");
		            }, 750); 
								
							}else if(  (requires[0].$dirty && requires[0].$valid) || requires[0].$modelValue==="" ){
								element.parent('.wrapper').removeClass('error');
							}
							*/

						});

						
				}
	      };
			}
		};
	}
	input.$inject = ['$rootScope', '$timeout', '$compile'];;

	function select($rootScope, $compile){
		return {
			scope: {},
			require:['?ngModel', '^form', 'select'] , 
			controller:  ['$scope', '$element', '$attrs', '$rootScope', function($scope,$element,$attrs,$rootScope ){

				$scope.secondAction =function(name) {
					$rootScope.$emit('secondActionNew', name);
				}

			}],
			compile: function(){
				return {
	        pre: function preLink(scope, element, attrs, requires) {   
	        	var error    = angular.element("<label class='invalid'>"+(attrs.error || 'error')+"</label>"),
            		wrapper = angular.element("<div class='wrapper'></div>");

		 				if( typeof(attrs.secondAction) !== 'undefined' ) {

		 					element.wrap(wrapper); 
		 					element.parent('.wrapper').addClass('open--select-w-second-action');

		 					var secondAction = angular.element( "<span ng-click=secondAction('"+element.attr('name')+"') class='  "+attrs.secondAction+"'></span>");
		 					element.parent('.wrapper').append( secondAction );
		 					
		 					$compile( secondAction )(scope);

		 				}else {
		 					element.wrap(wrapper); 
		 					element.parent('.wrapper').addClass('open--select');
		 				}

	        },  
	        post: function postLink(scope, element, attrs,requires) {    
						
					}
	      };
			}
		};
	}
	select.$inject = ['$rootScope', '$compile'];;

	function textarea($rootScope, $compile){
		return {
			scope: {},
			restrict:'E',
			require:['?ngModel', '^form'] , 
			controller:  ['$scope', '$element', '$attrs', '$rootScope', function($scope,$element,$attrs,$rootScope ){

			}],
			compile: function(){
				return {
	        pre: function preLink(scope, element, attrs, requires) {   
	        	var error    = angular.element("<label class='invalid'>"+(attrs.error || 'error')+"</label>"),
            		wrapper = angular.element("<div class='wrapper'></div>");

		 					element.wrap(wrapper); 
		 					element.parent('.wrapper').addClass('open--select');

	        },  
	        post: function postLink(scope, element, attrs,requires) {    
						
					}
	      };
			}
		};
	}
	textarea.$inject = ['$rootScope', '$compile'];;




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
list.$inject = ['$rootScope', '$compile', '$timeout'];

	angular.module('yemd')
		.directive('modal',modal);

	function modal () {

	return {
		scope: {},
		restrict: 'C',
		controller: ['$scope', '$element', '$rootScope', '$compile', function($scope, $element, $rootScope, $compile){

			$rootScope.$on('toggleModal', function(e, toggle, html){
				$rootScope.$emit('toggleOverlay', toggle);
				$element.html(html);

				if (toggle) { if (!$element.hasClass('show')) {$element.addClass('show')};
				} else { if ($element.hasClass('show')) {$element.removeClass('show')}; }

			});

			$rootScope.$on('clickOverlay',function(e){
				if ($element.hasClass('show')) {$element.removeClass('show')};
			});

		}]
	}
}

	angular.module('yemd')
	.directive('overlay',overlay);

	function overlay($rootScope, $timeout){
		return {
			scope: {},
			controller: ['$scope', '$element', '$attrs', '$rootScope', '$timeout', function($scope, $element, $attrs, $rootScope, $timeout){
				/*
				$rootScope.$on('toggleSidenav', toggleSidenav);
				*/
				$rootScope.$on('toggleOverlay', toggleOverlay);
				
				$element.on('click', closeOverlay );
				/*
				function toggleSidenav(e, type, toggle){
					toggleOverlay(e, toggle);
				}
				*/
				function toggleOverlay(e, toggle){
					if ( toggle ) {
						$element.hasClass('hide') ? $element.removeClass('hide').addClass('show') : $element.addClass('show');
	        }else{
						$element.hasClass('show') ? $element.removeClass('show').addClass('hide') : $element.addClass('hide');
	        };
				}
				
				function closeOverlay(){
				  $rootScope.$emit('clickOverlay');
				  $element.removeClass('show').addClass('hide');

				  $timeout(function(){
				  	$element.removeClass('hide');
				  	$element.remove();
				  }, 750);

	      }

			}],
			compile: function(tElement, tAttrs){

				tElement.addClass('overlay');
			}
		};
	}
	overlay.$inject = ['$rootScope', '$timeout'];;



angular.module('yemd')
	.directive('picker', picker);

	function picker(){
		return {
			scope:{},
			controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){

			}]
		}
	}


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

}
sidenav.$inject = ['$rootScope', '$compile', '$timeout'];;



angular.module('yemd')
	.directive('snackbar', snackbar);

function snackbar ($rootScope,$timeout){

    return {
      scope:{}, 
      restrict: 'C',
      compile:function(){
        return {
          post: function postLink(scope,element,attrs){

            $rootScope.$on('showSnackbar',function(event,message){
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

  }
  snackbar.$inject = ['$rootScope', '$timeout']; 

angular.module('yemd')
	.directive('toolbar',toolbar);

function toolbar($yemd, $rootScope){
	
	return function link (scope, element, attrs){

		element.attr('class','toolbar--default');

		var resizeWindow =  function() {

	      	var icons = element.find('[data-icon]'),
	      			title = element.find('.toolbar__title');

	      	var marginLeft = ( $yemd.viewportW() < $yemd.mqMedium)? 16: 24,
	      			width= ( $yemd.viewportW() < $yemd.mqMedium)?$yemd.viewportW() - 16 :$yemd.viewportW() - 24;

	      	if ( icons.length > 0 ){

	      		if( $yemd.viewportW() < $yemd.mqMedium && element.attr('class') === 'toolbar--default' ){ 
	      		 	marginLeft =72;
	      		}else if( $yemd.viewportW() >= $yemd.mqMedium && element.attr('class') === 'toolbar--default' ){
	      			marginLeft =80;
	      		}else if( $yemd.viewportW() >= $yemd.mqMedium && element.attr('class') === 'toolbar--2rows' ){
	      			marginLeft =80;
	      		}else if( $yemd.viewportW() < $yemd.mqMedium && element.attr('class') === 'toolbar--extend' ){ 
	      		 	marginLeft =72;
	      		}else if( $yemd.viewportW() >= $yemd.mqMedium && element.attr('class') === 'toolbar--extend' ){
	      			marginLeft = 104;
	      		};

	      		width = (icons.length === 1)? $yemd.viewportW()  - marginLeft :  ($yemd.viewportW() - marginLeft) - ( (48 + 4 ) *  (icons.length - 1 ) )  ;

	      	}

	      	angular.forEach(icons , function(value, index){
	      		if ( index === 0 ) {
	      			$(value).css({
	      				left:  ( $yemd.viewportW() < $yemd.mqMedium)? 4 : 8 
	      			});
	      		}else{
	      			var rightB = ( $yemd.viewportW() < $yemd.mqMedium)? 4 : 8 ;
	      			$(value).css({
	      				left: 'auto',
	      				right: index * rightB + ( (index -1) * 48 )
	      			});

	      		};
	      		
	      	});

	      	title.css({
	      		'padding-right': 4 ,//( $yemd.viewportW() < $yemd.mqMedium)?16:24,
	      		'width': width ,
	      		'margin-left' : marginLeft
	      		} 
	      	);
	      	
	  };

	  resizeWindow();

	  $rootScope.$on('resizeWindow', function(e){
	   resizeWindow();
	  });

	  $rootScope.$on('changeTitleToolbar',function(event, name, newTitle){ 
			if ( attrs.toolbar === name ) { element.find('.toolbar__title').text(newTitle);  }; 
	  });
	        	
	  $rootScope.$on('changeTypeToolbar', function(e, name, className){ 
	    if ( attrs.toolbar === name ) {  element.attr( 'class', 'toolbar--'+ className  ); };
		});

	  $rootScope.$on('hideToolbar', function(e, name){
	    if ( attrs.toolbar === name ) { element.addClass('hide'); }; 	
	  });
	      
	  $rootScope.$on('addAction', function(e, name, action){
      if ( attrs.toolbar === name ) {
	      element.attr( 'class', 'toolbar--extend'  );
	      element.append(action);
	      $yemd.toolbarIsExtend = true;
	      $rootScope.$emit('toolbarIsExtend');
	    };
	  });

	  $rootScope.$on('removeAction', function(e, name){
			if ( attrs.toolbar === name && $yemd.toolbarIsExtend ) {
	      element.find('.action').remove(); 
	      element.attr( 'class', 'toolbar--default'  );
	      $yemd.toolbarIsExtend = false;
	      $rootScope.$emit('toolbarIsExtend');
	    };
	  });

	};

}
toolbar.$inject = ['$yemd', '$rootScope'];;


angular.module('yemd')
	.factory('checkWebpage', ['$yemd', function( $yemd ) {

		return function(component){

			if ( $yemd.webPage && $yemd.viewportW() >= $yemd.webPageStartMQ && $yemd.leaveBehaviorComponents.indexOf(component)!== -1 ) {
		  	return true;
		  }else if($yemd.viewportW() < $yemd.webPageStartMQ){
		  	return true;
		  }else{
		  	return false;
		  };

		};

	}])

	.factory('checkVersionApp', ['$yemd', function( $yemd ) {

		return function(component){

			if ( $yemd.webPage ) {

				if ( $yemd.viewportW() >= $yemd.webPageStartMQ || $yemd.webPageMobile ) {
					angular.element('body').removeClass($yemd.classMaster );
      		angular.element('body').addClass( $yemd.webPageClass );
				} else {
					angular.element('body').removeClass( $yemd.webPageClass );
      		angular.element('body').addClass( $yemd.classMaster  );
				}

				if ($yemd.forceYemd) {
					angular.element('body').removeClass( $yemd.webPageClass );
      		angular.element('body').addClass( $yemd.classMaster  );
				};

			} else {
				angular.element('body').removeClass( $yemd.webPageClass );
      	angular.element('body').addClass( $yemd.classMaster  );
			}

		};

	}]); 
	

angular.module('yemd')
  .factory('validForm', validForm );

function validForm ($rootScope){ 
  
    return function(form){ 
 
      if (form.$pristine){ 
        $rootScope.$emit('showSnackbar', 'Debe llenar los campos solicitados' ) ; 
        return {status:false,message:'Debe llenar los campos solicitados'};
      }else if( form.$invalid ){
        var errors=[];
        if(angular.isObject(form.$error)){
          angular.forEach(form.$error, function(value,key){
            if (key==='required') {
              angular.forEach(value, function(valueRequired, index){//requireds
                this.push({error:'required', input: valueRequired.$name, message:'El campo '+valueRequired.$name+" es obligatorio" });
              }, errors);
            }
            if (key==='pattern') {
              angular.forEach(value, function(valueFailed, index){//Faileds
                this.push({error:'pattern', input: valueFailed.$name, message:'El formato de '+valueFailed.$name+" ingresado es incorrecto" });
              }, errors);
            }
          }) 
        } 
        $rootScope.$emit('showSnackbar', 'El formulario es incorrecto' ) ;  
        return { status: false, errors: errors, message : "el formulario es incorrecto" };
      }else{  
        return { status:true,message:'El formulario es correcto'};  
      } 

    };
}
validForm.$inject = ['$rootScope'];

angular.module('yemd')
	.service('$verge', function() {
		return verge;
	}); 
	