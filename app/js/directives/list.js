(function(yemd){  
  'use strict'; 

  function list($rootScope,$compile,$rootElement,$filter,$state,$document){
    return {
      scope: {
        items: '=',
        module: '='
      }, 
      restrict:'E',  
      controller: function  ($scope, $element, $attrs,$rootScope,$compile,$rootElement,$filter,$state){
        var vm =this ; 
        vm.field=function(field){
          if ( field.indexOf('_')!==-1  ) { return field.replace(/_/g,' ')}
          else if( field.toLowerCase()==='area' ){ return 'Área'}
          else if( field.toLowerCase()==='descripcion' ){ return 'descripción'}
          else{ return field }; 
        };
        vm.value=function(field,value){
          if ( field==='precio_puesto_en_planta'  ) { return 'S/. '+value  } 
          else{ return value }; 
        };
        $scope.title = $state.current.name.split('.');  $scope.title = $scope.title[0]; 

        angular.forEach($scope.items, function(value,index){
          angular.forEach(value, function(valueField,field){
            if ( field.indexOf('id_')!== -1 && field !== 'id_'+$scope.module ) {  
              delete $scope.items[index][field] ;
            };
            if (field === 'id_'+$scope.module) { delete $scope.items[index][field] ; $scope.items[index].id= valueField ; };
            if (field.indexOf('estado')!== -1) { 
              $scope.items[index][field] = (valueField==='1')?'Activo':'No ctivo';
            };
          });
        }); 
        console.log($scope.items,$scope.module);
        $scope.search=''; 
        $filter('orderBy')($scope.items, 'Nombres');  
        $scope.selectItem= function(){ 
          $rootScope.$emit('removeFormSearch');
          $rootScope.$emit('removeIconSearch');
        }
        // Order
        $scope.order=function(field){
          console.log('Order by '+field);
          $scope.orderBy= [field];
        }
        $rootScope.$on('createFormSearch',function(e){
          var iconSearch   = $rootScope.element("<icon data-icon='search' data-action='search' data-search='search'></icon>"); 
          $compile(iconSearch)($scope); 
          $rootScope.$emit('removeIconSearch');
          $rootScope.$emit('changeIcon',{oldAction:'back', newAction:'sidenavLeft', newIcon:'menu'});
          $rootElement.find('header').find('icon').eq(0).after( iconSearch );   
        }) 
      },
      controllerAs:'vm',
      templateUrl: 'yemd/list.html',
      compile: function(){
        return {
          pre: function preLink(scope, element, iAttrs, vm) {
            $rootScope.$emit('changeIcon',{oldAction:'back', newAction:'sidenavLeft', newIcon:'menu'});
            if ( scope.items.length === 0 ) {
              element.append($rootScope.element("<h2 class='sub-title'> No hay registros de "+scope.title+" </h2> "));
            };  
            element.addClass( scope.className );
            $rootScope.$emit('changeAppbar', 'extend' );
            $rootScope.$emit('showAction','embed'); 
            $rootScope.$emit('removeIconEdit');  
            $rootScope.$emit('createFormSearch');
            $rootScope.$emit('changeTitleAppbar', scope.title );  
          }, 
          post: function postLink(scope, element, iAttrs, vm) {
            $rootScope.$on('cleanFormSearch',function(e){
              scope.search=''; 
            });  
            
          }
        };
      }
    };
  }; 


  yemd.directive('list',list);    

})(yemd);
 
