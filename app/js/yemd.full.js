'use strict';  

angular.module('yemd', []);

angular.module('yemd')
  .provider('$yemd', $yemdProvider )
  .run(initYemd);

function $yemdProvider(){

  this.$get = function(){
    return { 
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
      }
    };
  }

}

function initYemd ($rootElement) {
  var snackbar = angular.element("<div class='snackbar'><p></p></div>"), 
      overlay = angular.element("<div class='overlay'> </div>"),  
      action = angular.element("<div data-action> </div>");  

  $rootElement.find('body').append( action );
  $rootElement.find('body').append( overlay );   
  $rootElement.find('body').append( snackbar ); 
}
initYemd.$inject = ['$rootElement'];

'use strict';  

angular.module('yemd')
	.directive('action',action);

	function action($yemd, $rootScope){
		return {
			scope: {},
			controller:['$scope', '$element', '$attrs', '$yemd', '$rootScope', function($scope, $element, $attrs, $yemd, $rootScope){
				$element.addClass( 'action--'+$yemd.action.type );
				$element.html(angular.element('<span class="'+$yemd.action.icon+'"></span>'));
			
				$rootScope.$on('showAction', function ( e, obj ) {
					$element.css('display','block');
					$element.attr('class', 'action--' + obj.type );
					$element.html(angular.element('<span class="'+ obj.icon +'"></span>'));
					$element.appendTo( obj.nodeClose );
					$element.addClass( obj.classSpecial );
				});

			}],
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
	}
	action.$inject = ['$yemd', '$rootScope'];; 

	
'use strict';  

angular.module('yemd')
		.directive('card',card);

	function card($rootScope, $timeout){
		return {
			scope: {},  
			restrict:'AC',  
			controller:['$scope', '$element', '$attrs', '$rootScope', function($scope,$element,$attrs,$rootScope){
				//$scope.hide = ()?:;
			}],
			compile: function(){
				return {
	        pre: function preLink(scope, element, attrs ) {  

	        		element.find('.card__cover').css({
								'background-image': "url('"+ element.find('.card__cover__image').attr('src')+"')" 
							});

	        		element.find('.card__photo').css({
								'background-image': "url('"+ element.find('.card__photo__image').attr('src')+"')" 
							});

	        }, 
	        post: function postLink(scope, element, attrs, $verge) {

	        }
	      };
			}
		};
	}
	card.$inject = ['$rootScope', '$timeout'];; 

'use strict'; 
	
	function input($rootScope, $timeout){
		return {
			scope: {},
			restrict:'E', 
			require:['?ngModel','^form'] , 
			controller:  ['$scope', '$element', '$attrs', '$rootScope', function($scope,$element,$attrs,$rootScope ){

			}],
			compile: function(){
				return {
	        pre: function preLink(scope, element, attrs, requires) {   
	        	var label    = angular.element("<label class='valid'>"+attrs.placeholder+"</label>"),
            		error    = angular.element("<label class='invalid'>"+(attrs.error || 'error')+"</label>"),
            		fieldset = angular.element("<fieldset></fieldset>");

		 				if ( attrs.type==="range" || attrs.type==="color" ) { 
		 					element.wrap(fieldset); 
		 					element.parent('fieldset').prepend(label);
		 					element.parent('fieldset').addClass('open');
		 				}else if(attrs.type==="date" || attrs.type==="month"|| attrs.type==="week" || attrs.type==="time" || attrs.type==="datetime" || attrs.type==="datetime-local"  ){
		 					element.wrap(fieldset); 
		 					element.parent('fieldset').prepend(label);
		 					element.parent('fieldset').addClass('open--all');
		 				}else if(attrs.type==="submit" || element[0].tagName==="button"  ){
		 				}else{
		 					element.wrap(fieldset); 
		 					element.parent('fieldset').prepend(label);
		          element.parent('fieldset').append(error);
		 				}
						
	        },  
	        post: function postLink(scope, element, attrs,requires) {    
	        	/*
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
						*/
		        /*
		        element.on('keydown',function(event){
		        	if ( attrs.type === 'search' && event.which == 27 ) { 
		        		$rootScope.$emit('cleanFormSearch') ;
		        		$rootScope.$emit('removeFormSearch');  
		        	}
		        });
						*/
				
						element.on('blur',function(){ 
 
							if ( requires[0].$dirty && attrs.type!=="range" ) {
								if( !element.parent('fieldset').hasClass("focus") ) {element.parent('fieldset').addClass("focus");};
								element.parent('fieldset').find('label').eq(0).removeClass('leave').addClass("showD enter");
							}
							/*

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
								
							}*/
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
	}
	input.$inject = ['$rootScope', '$timeout'];;

	angular.module('yemd')
		.directive('input',input);


'use strict'; 
	
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
	        	/*
	        	function toggleOverlay(band){
	        		if (band) {
								element.hasClass('hide')?element.removeClass('hide').addClass('show'): element.addClass('show');
	        		}else{
								element.hasClass('show')?element.removeClass('show').addClass('hide'): element.addClass('hide');
	        		};
	        	}
	        	function closeOverlay(){
	        		$rootScope.$emit('toggleSidenav', 'right', false) ;
				   		$rootScope.$emit('toggleSidenav', 'left', false) ;
				   		$rootScope.$emit('toggleModal', false) ;
				   		
				   		toggleOverlay(false);
				   		$rootScope.$emit('clickOverlay' ) ;
	        	}
	        	$rootScope.$on('toggleOverlay', function(e, band){
	        		toggleOverlay(band);
						})

				   	element.on('click',function(){  closeOverlay(); });
				   	$rootScope.$on('closeOverlay',function(e){ closeOverlay(); });
				   	*/
				  }
	      };
			}
		};
	}
	overlay.$inject = ['$rootScope'];;


'use strict'; 

angular.module('yemd')
	.directive('sidenav',sidenav);

function sidenav($yemd, $rootScope){
		return {
			scope: {},
			//transclude: true,
			//templateUrl: 'templates/sidenav.html',
			controller: ['$scope', '$element', '$attrs', '$yemd', '$rootScope', function  ($scope, $element, $attrs, $yemd, $rootScope ){

				$yemd.sidenav.left.show = true;//show icon sidenav left
				$yemd.sidenav.right.show = true;//show icon sidenav right

				$rootScope.$on('toggleSidenav',function(e, type, toggle){ 

					if ( $attrs.sidenav === type ) { (toggle)? $element.removeClass('hide').addClass('show') : $element.removeClass('show').addClass('hide') ; }

				});

				$rootScope.$on('clickOverlay',function(e){
					if ($element.hasClass('show')) {$element.removeClass('show').addClass('hide')};
				});
				
			}],
			controllerAs:'vm',
			compile: function(tElement, tAttrs){

				return {
	        pre: function preLink(scope, element, attrs, vm) {

	        	if ( element.find('.sidenav__cover') && typeof(element.find('.sidenav__cover').data('cover')) !== 'undefined'   ){
							var cover = element.find('.sidenav__cover');
		        	cover.css( 'background-image', "url('"+cover.data('cover')+"')");
	        	}
		        	
	        },  
	        post: function postLink(scope, element, attrs, vm) {

	        }
	      };
			}
		};
}
sidenav.$inject = ['$yemd', '$rootScope'];;

'use strict'; 

angular.module('yemd')
	.directive('toolbar',toolbar)
	.directive('appbar',toolbar);

function toolbar($yemd, $rootScope){
		
	return {
			scope: {
				type:'@' //extend,normal'
			}, 
			transclude: true,
			restrict:'C', 
			templateUrl: 'templates/toolbar.html',
			controller: ['$scope', '$element', '$attrs', '$transclude', '$yemd', '$rootScope', function  ($scope, $element, $attrs, $transclude, $yemd, $rootScope){
				
				if ( $attrs.class.indexOf('appbar') !== -1 ) {
					$scope.menu = $yemd.sidenav.left.show; 
					$scope.menuRight = $yemd.sidenav.right.show;
				};
				 

				$scope.openMenu = function(side) {
					$rootScope.$emit('toggleSidenav', side, true);
				}

				$rootScope.$on('changeTitleAppbar',function(event,newTitle){ 
	      	if ( $attrs.class.indexOf('appbar') !== -1 ) {
						$element.find('.appbar__title').text(newTitle); 
					};
	      });
	        	
	      $rootScope.$on('changeAppbar', function(e, className){ 
	      	if ( $attrs.class.indexOf('appbar') !== -1 ) {
						$element.addClass( className );
					};
				});

			}],
			compile: function(){
				return {
	        pre: function preLink(scope, element, iAttrs, toolbarController) { 

	        }, 
	        post: function postLink(scope, element, iAttrs, toolbarController) {

	        	

	        }
	      };
			}
	};

}
toolbar.$inject = ['$yemd', '$rootScope'];;

'use strict';

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
        $rootScope.$emit('showSnackbar', 'El forumlario es incorrecto' ) ;  
        return { status: false, errors: errors, message : "el formulario es incorrecto" };
      }else{  
        return { status:true,message:'El formulario es correcto'};  
      } 

    };
}
validForm.$inject = ['$rootScope'];