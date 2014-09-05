(function(yemd){  
	'use strict'; 
	
	form.$inject=['$rootScope','$compile','validForm','rest','$state'];
	function form($rootScope, $compile,validForm,rest,$state){
		return {
			scope: {
				inputs:'=',
				models: '=',
				module: '=',
				type  : '@',
				iditem: '='
			},  
			restrict:'A', 
			require:'form',
			controller:  function($scope,$element,$attrs,$rootScope,$compile,validForm ){ 
				$scope.submit={};

				if ($scope.type==='update') $scope.submit.value='Actualizar'
				if ($scope.type==='new')    $scope.submit.value='Registrar'
				if ( typeof($scope.type)==='undefined' ) $scope.submit.value='Registrar' //default

				if (!$scope.inputs.status){
					$scope.template= $scope.inputs.message ;
				}else {
					var template='';
					$scope.options={};
					angular.forEach($scope.inputs.respond, function(value,index){
						switch (value.type){
							case 'textarea':
								var required = (value.required)? 'required' : '' ;
								template += "<textarea name='"+value.name+"' "+required+" placeholder='"+value.name+"' ng-model='models."+value.name+"'></textarea>";
							break;
							case 'switch': 
								template +="<label class='switch switch-green'><input type='checkbox' ng-true-value='1' ng-false-value='0' placeholder='"+value.name+"' data-special='switch' class='switch-input' name='"+value.name+"' ng-model='models."+value.name+"'><span class='switch-label'></span><span class='switch-handle'></span></label>";
							break;
							case 'select': 
								var required = (value.required)? 'required' : '' ;
								template += "<select name='"+value.name+"' yemd-select  "+required+" placeholder='"+value.name+"' ng-model='models."+value.name+"' ng-options='model."+value.name+" as model.nombres for model in options."+value.name+"'><option value=''>Seleccione "+value.name.substr(3)+"</option></select>";
								$scope.options[value.name] = value.options;
							break;
							default:
								//$scope.models[value.name] = ($scope.type==='update')? value.value : '' ;
								var required = (value.required)? 'required' : '' ;  /*max='"+value.max+"'*/
								template += "<input type='"+value.type+"' name='"+value.name+"' "+required+"  placeholder='"+value.name+"' ng-model='models."+value.name+"'/>";
							break;
						}
					}); 
					template += "<input type='submit' value='"+ $scope.submit.value +"' ng-model='models.submit' ng-click='submit()' />";
				} 
				$scope.template=$rootScope.element( template ); 
 
				// fill modles if type === update
				if ($scope.type==='update'){
					angular.forEach($scope.inputs.respond, function(value,index){
						if ( value.type==='number' ) {
							console.log(value.value);
							$scope.models[value.name]= parseFloat(value.value) ;
						} else{
							$scope.models[value.name]=value.value;
						};
						
					});
					console.log($scope.models);
				} 

			},
			compile: function(){
				return {
	        pre: function preLink(scope, element, attrs, require) {  

	        	element.append( scope.template );
						var elementI = $compile(scope.template)(scope);
 						
						var titleAppbar= (scope.type==='update')? 'Editar '+scope.module :'Nuevo '+scope.module;

						$rootScope.$emit('changeTitleAppbar', titleAppbar ); 

						$rootScope.$emit('changeAppbar', 'default' );
            $rootScope.$emit('hideActionNew'); 
            $rootScope.$emit('hideSearch'); 
            
						$rootScope.$emit('changeIcon',{oldAction:'sidenavLeft', newAction:'back', newIcon:'arrow-left'});
	        },  
	        post: function postLink(scope, element, attrs, require) {   

	        	scope.submit  = function(){ 

	        		if ( scope.type==='new' ) {
	        			var validFormResult = validForm(require) ; 
					 			if ( validFormResult.status ) {
					 				rest( scope.module+'/new' ,'POST', scope.models).then(function(respond){  
		                console.log(respond);
		                if (respond.status) { 
		                  $state.go('^.list');
		                }else{ 
		                  $rootScope.$emit('showSnackbar', respond.message ) ;
		                };
		              });
					 			}else{
					 				console.log("display the error messages",validFormResult);
					 			}; 
	        		}else if(scope.type==='update'){
	        			console.log(scope.module+'/'+scope.iditem);
	        			rest( scope.module+'/'+scope.iditem ,'PUT', scope.models).then(function(respond){  
		              console.log(respond);
		              if (respond.status) { 
		                $state.go('^.list');
		              }else{ 
		                $rootScope.$emit('showSnackbar', respond.message ) ;
		              };
		            });
	        		}

			         
				 		}

				  }
	      };
			}
		};
	};

	yemd.directive('yemdForm',form);
})(yemd);

