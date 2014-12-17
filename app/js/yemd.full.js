angular.module('yemd', []);

angular.module('yemd')
  .provider('$yemd', $yemdProvider )
  .run(initYemd);

function $yemdProvider(){

  this.$get = ['$rootScope', function($rootScope){
    return { 
      
      mqMedium: 768,
      mqLarge: 1200,

      /*
      sidenav: {
        left: {
          show : false,
          toggle: false,
          icon: 'mdfi_navigation_menu'
        },
        right :{
          show : false,
          toggle: false,
          icon: 'mdfi_navigation_menu'
        }
      },
      action: {
        show: false,
        type: 'float',
        icon: 'mdfi_content_add'
      },
      canvas: {
        className: ''
      },
      */
      //function 
      toggleSidenav: function( sidenav, toggle ){
        $rootScope.$emit('toggleSidenav', sidenav, toggle)
      }
    };
  }]

}

function initYemd ($rootElement, $rootScope) {

  var snackbar = angular.element("<div class='snackbar'><p></p></div>"), 
      overlay = angular.element("<div class='overlay'> </div>"),  
      modal = angular.element("<div class='modal'> </div>"),  
      action = angular.element("<div data-action></div>");  

  $rootElement.find('body').append( action );
  $rootElement.find('body').append( modal );   
  $rootElement.find('body').append( overlay );   
  $rootElement.find('body').append( snackbar ); 


}
initYemd.$inject = ['$rootElement', '$rootScope'];



angular.module('yemd')
	.directive('action',action);

	function action($yemd, $rootScope){
		return {
			scope: {},
			controller:['$scope', '$element', '$attrs', '$yemd', '$rootScope', function($scope, $element, $attrs, $yemd, $rootScope){

				//$element.addClass( 'action--'+$yemd.action.type );
				//$element.html(angular.element('<span class="'+$yemd.action.icon+'"></span>'));
			
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

			}],
			compile: function(){
				return {
	        pre: function preLink(scope, element, attrs ) {   
 						element.css('display','none');
	        }, 
	        post: function postLink(scope, element, attrs) {

	        }
	      };
			}
		};
	}
	action.$inject = ['$yemd', '$rootScope'];; 

	
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

	function canvas($rootScope, $verge, $yemd, $window){
		return {
			scope:{
				name: '@'
			},
			restrict: 'C',
			controller: ['$scope', '$element', '$attrs', '$rootScope', '$verge', '$yemd', '$window', function($scope, $element, $attrs, $rootScope, $verge, $yemd, $window){
				
				$element.attr('class','canvas--default');
				$scope.className = 'default';
				
				$rootScope.$on('changeTypeCanvas', function(e, name, className){ 
	      	$scope.className = className;
	      	resizeWindow();
				});

				function resizeWindow() {
					if ( $verge.viewportW() >= $yemd.mqMedium && $scope.className !== 'default' ) {
						if ( $scope.className ==='block' ) { $rootScope.$emit('changeTypeToolbar','appbar', '2rows'); };
						$element.attr( 'class', 'canvas--'+ $scope.className  );
					}else if( $scope.className === 'default' ) {
						//$rootScope.$emit('changeTypeToolbar','appbar', 'default');
						$element.attr( 'class', 'canvas--default' );
					};
				}

				$window.onresize = function(event) {
					resizeWindow();
					$rootScope.$emit('resizeWindow');
				};

			}]
		}
	}
	canvas.$inject = ['$rootScope', '$verge', '$yemd', '$window'];


angular.module('yemd')
		.directive('card',card);

	function card($rootScope, $timeout){
		return {
			scope: {
				photo: '@',
				cover: '='
			},
			controller:['$scope', '$element', '$attrs', '$rootScope', function($scope,$element,$attrs,$rootScope){
				
				var type = ($attrs.card==='')?'':'--'+$attrs.card;
				$element.addClass('card'+type);

			}],
			compile: function(){
				return {
	        pre: function preLink(scope, element, attrs ) {  

	        }, 
	        post: function postLink(scope, element, attrs, $verge) {
	        	

	        	if ( attrs.card === 'square-picture' ) {
	        		element.css({
								'background-image': "url('"+ element.find('.card__cover__image').attr('src')+"')" 
							});
	        	};

	        	if ( element.find('.card__cover') ) {
	        		element.find('.card__cover').css({
								'background-image': "url('"+ element.find('.card__cover__image').attr('src')+"')" 
							});
	        	};
						
	        }
	      };
			}
		};
	}
	card.$inject = ['$rootScope', '$timeout'];; 


angular.module('yemd')
	.directive('icon', icon);

	function icon($rootScope){
		return {
			scope:{
				icon: '='
			},
			controller: ['$scope', '$element', '$attrs', '$rootScope', function($scope, $element, $attrs, $rootScope){

				$element.on('click', function(){
					$scope.icon.click();
				});

				$scope.$watch('icon.figure', function(){ $element.attr('class', $scope.icon.figure);});
				$scope.$watch('icon.click', function(){ $element.attr('class', $scope.icon.figure);});
				$scope.$watch('icon.show', function(){ if( !$scope.icon.show ){ $element.addClass('hide'); }else{ $element.removeClass('hide'); }; });

			}]
		}
	}
	icon.$inject = ['$rootScope'];


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

				$scope.$watch('hide', function(){
	        $scope.hide?$element.closest('.wrapper').addClass('hide'):$element.closest('.wrapper').removeClass('hide');
	      });

			}],
			compile: function(tElement, tAttrs){
				return {
	        pre: function preLink(scope, element, attrs, requires ) { 

	        	var label = angular.element("<label class='valid'>"+attrs.placeholder+"</label>"),
            		error = angular.element("<label class='invalid'>"+(attrs.error || 'error')+"</label>"),
            		wrapper = angular.element('<div class="wrapper"></div>') ;

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




		 				element.bind('change', function () {

		 					if (attrs.type==="file"){
		 						scope.$apply(function () {
				          requires[0].$setViewValue( element.val() );
				        });
		 					}
				        
				    }); 

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

						element.on('blur',function(){ 
 							//console.log(requires[0]);
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
		.directive('modal',modal);

	function modal () {

	return {
		scope: {

		},
		restrict: 'C',
		//template: "jojo ds dfsfsfsfsffsj",
		controller: ['$scope', '$element', '$rootScope', '$compile', function($scope, $element, $rootScope, $compile){
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

		}],
		compile: function(tElement, tAttrs){

			return {

			}
		}
	}
}

	angular.module('yemd')
	.directive('overlay',overlay);

	function overlay($rootScope){
		return {
			scope: {},
			restrict:'C',
			controller: ['$scope', '$element', '$attrs', '$rootScope', function($scope, $element, $attrs, $rootScope){

				$rootScope.$on('toggleSidenav',function(e, type, toggle){  
					if ( toggle ) {
						$element.hasClass('hide') ? $element.removeClass('hide').addClass('show') : $element.addClass('show');
	        }else{
						$element.hasClass('show') ? $element.removeClass('show').addClass('hide') : $element.addClass('hide');
	        };
				});

				$element.on('click', closeOverlay );

				function closeOverlay(){
				  $rootScope.$emit('clickOverlay');
				  $element.hasClass('show') ? $element.removeClass('show').addClass('hide') : $element.addClass('hide');
	      }

			}],   
			compile: function(){
				return {
	        pre: function preLink(scope, element, iAttrs) {   
	        },  
	        post: function postLink(scope, element, iAttrs) { 
				  }
	      };
			}
		};
	}
	overlay.$inject = ['$rootScope'];;



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

function sidenav($yemd, $rootScope){
		return {
			scope: {},
			controller: ['$scope', '$element', '$attrs', '$yemd', '$rootScope', function ($scope, $element, $attrs, $yemd, $rootScope ){

				$element.attr('class','sidenav--'+$attrs.sidenav);

				$rootScope.$on('toggleSidenav',function(e, name, toggle){ 

					if ( $attrs.sidenav === name ) { 
						if ( toggle ) {
							( $element.hasClass('hide') )? $element.removeClass('hide').addClass('show') : $element.addClass('show') ;

						}else {
							( $element.hasClass('show') )? $element.removeClass('show').addClass('hide') : $element.addClass('hide') ;

						};
						 
					}

					if ( $element.hasClass('opacity') ) $element.removeClass('opacity') ;

				});

				$rootScope.$on('clickOverlay',function(e){
					if ($element.hasClass('show')) {$element.removeClass('show').addClass('hide')};
				});

				$rootScope.$on('toggleModal', function(e, toggle, html){
					if ($element.hasClass('show'))  $element.addClass('opacity');
				});

				$rootScope.$on('specialWidthSidenav', function(e, name, className){

					if ( $attrs.sidenav === name ) { $element.addClass( className ) ; }

				});

				$rootScope.$on('resetSpecialWidthSidenav', function(e, name){

					if ( $attrs.sidenav === name ) { $element.attr('class', $scope.defaultClassName ) ; }
					
				});
				
			}],
			controllerAs:'vm',
			compile: function(tElement, tAttrs){

				return {
	        pre: function preLink(scope, element, attrs, vm) {
		        	
	        },  
	        post: function postLink(scope, element, attrs, vm) {
						
						if ( element.find('.sidenav__cover') && typeof(element.find('.sidenav__cover').data('cover')) !== 'undefined'   ){
							var cover = element.find('.sidenav__cover');
		        	cover.css( 'background-image', "url('"+cover.data('cover')+"')");
	        	};

	        	element.find('.sidenav__content__link').on('click', function(){
	        		console.log('click');
	        		$rootScope.$emit('toggleSidenav', attrs.sidenav, false);
	        	});
	        	
	        	//if ( element.hight() > $verge.viewportH() ) {
	        		//element.css('overflow-y', 'srool');
	        	//}

	        }
	      };
			}
		};
}
sidenav.$inject = ['$yemd', '$rootScope'];;



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

function toolbar($yemd, $rootScope, $verge){
		
	return {
			scope: {
				type:'@', //extend, default'
				name: '@'
			}, 
			controller: ['$scope', '$element', '$attrs', '$yemd', '$rootScope', '$verge', function  ($scope, $element, $attrs, $yemd, $rootScope, $verge){
				
				var vm =this;

				$element.attr('class','toolbar--default');

				$rootScope.$on('changeTitleToolbar',function(event, name, newTitle){ 
					if ( $attrs.toolbar === name ) { $element.find('.toolbar__title').text(newTitle);  }; 
	      });
	        	
	      $rootScope.$on('changeTypeToolbar', function(e, name, className){ 
	      	
	      	if ( $attrs.toolbar === name ) { 
	      		$element.attr( 'class', 'toolbar--'+ className  );
	      	};

				});

	      $rootScope.$on('hideToolbar', function(e, name){
	      	if ( $attrs.toolbar === name ) {
	      		$element.addClass('hide');
	      	};
	      	
	      });

	      

	      this.resizeWindow =  function() {
	      	var icons = $element.find('[data-icon]'),
	      			title = $element.find('.toolbar__title');

	      	var marginLeft = ( $verge.viewportW() < $yemd.mqMedium)? 16: 24,
	      			width= ( $verge.viewportW() < $yemd.mqMedium)?$verge.viewportW() - 16 :$verge.viewportW() - 24;

	      	marginLeft += 'px';
	      	width += 'px';

	      	if ( icons.length > 0 ){

	      		if( $verge.viewportW() < $yemd.mqMedium && $element.attr('class') === 'toolbar--default' ){ 
	      		 	marginLeft =72;
	      		}else if( $verge.viewportW() >= $yemd.mqMedium && $element.attr('class') === 'toolbar--default' ){
	      			marginLeft =80;
	      		}else if( $verge.viewportW() < $yemd.mqMedium && $element.attr('class') === 'toolbar--extend' ){ 
	      		 	marginLeft =72;
	      		}else if( $verge.viewportW() >= $yemd.mqMedium && $element.attr('class') === 'toolbar--extend' ){
	      			marginLeft = 104;
	      		};

	      		width = (icons.length === 1)? $verge.viewportW()  - marginLeft : ( $verge.viewportW() - ( 48 *  (icons.length - 1 ) ) ) - marginLeft;

	      		width += 'px';
	      		marginLeft += 'px';

	      	}

	      	title.css({
	      		'padding-right': ( $verge.viewportW() < $yemd.mqMedium)?16:24,
	      		'width': width ,
	      		'margin-left' : marginLeft
	      		} 
	      	);
	      	
	      };

	      this.resizeWindow();

	      $rootScope.$on('resizeWindow', function(e){
	      	vm.resizeWindow();
	      	
	      });

			}],
			compile: function(tElement, tAttrs){

				return {
	        pre: function preLink(scope, element, attrs, vm) {
		      	
	        },  
	        post: function postLink(scope, element, attrs, vm) {
						

	        }
	      };
			}
	};

}
toolbar.$inject = ['$yemd', '$rootScope', '$verge'];;


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
	.service('$verge', [ function() {
		return verge;
	}]); 
	