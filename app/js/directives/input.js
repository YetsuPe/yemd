'use strict'; 

angular.module('yemd')
	.directive('input',input)
	.directive('yemdSelecto', select);

	function input($rootScope, $timeout){
		return {
			scope: {},
			restrict:'E', 
			require:['?ngModel','^form'] , 
			controller:  function($scope,$element,$attrs,$rootScope ){

			},
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
		 				}else if(attrs.type==="date" || attrs.type==="month"|| attrs.type==="week" || attrs.type==="time" || attrs.type==="datetime" || attrs.type==="datetime-local"   ){
		 					element.wrap(fieldset); 
		 					element.parent('fieldset').prepend(label);
		 					element.parent('fieldset').addClass('open--all');
		 				}else if(attrs.type==="submit" || element[0].tagName==="button" || attrs.type==="radio" ){

		 				}else if( attrs.type==="checkbox" ){
		 					element.wrap( angular.element("<label class='switch switch-green'></label>") ); 
		 					element.addClass('switch-input');
		 					element.after( angular.element("<span class='switch-track'></span><span class='switch-thumb'></span>") );

		 					element.parent('label').wrap(fieldset); 
		 					element.parent('label').parent('fieldset').prepend(label);
		 					element.parent('label').parent('fieldset').addClass('open');

		 				} else{
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
            		fieldset = angular.element("<fieldset></fieldset>");

		 				if( typeof(attrs.secondAction) !== 'undefined' ) {

		 					element.wrap(fieldset); 
		 					element.parent('fieldset').addClass('open--select-w-second-action');

		 					var secondAction = angular.element( "<span ng-click=secondAction('"+element.attr('name')+"') class='  "+attrs.secondAction+"'></span>");
		 					element.parent('fieldset').append( secondAction );
		 					
		 					$compile( secondAction )(scope);

		 				}else {
		 					element.wrap(fieldset); 
		 					element.parent('fieldset').addClass('open--select');
		 				}

	        },  
	        post: function postLink(scope, element, attrs,requires) {    
						
					}
	      };
			}
		};
	};

