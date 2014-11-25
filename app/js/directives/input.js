'use strict'; 

angular.module('yemd')
	.directive('input',input)
	.directive('yemdSelecto', select);

	function input($rootScope, $timeout, $compile){
		return {
			scope: {
				hide: '='
			},
			restrict:'E', 
			require:['?ngModel','?^form'] , 
			controller:  function($scope,$element,$attrs,$rootScope ){

				$scope.$watch('hide', function(){
	        $scope.hide?$element.closest('.wrapper').addClass('hide'):$element.closest('.wrapper').removeClass('hide');
	      });

			},
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
	};

	function select($rootScope, $compile){
		return {
			scope: {},
			require:['?ngModel', '^form', 'select'] , 
			controller:  function($scope,$element,$attrs,$rootScope ){

				$scope.secondAction =function(name) {
					$rootScope.$emit('secondActionNew', name);
				}

			},
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
	};
