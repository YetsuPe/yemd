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

