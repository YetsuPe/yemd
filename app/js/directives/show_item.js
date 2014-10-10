(function(yemd){  
  'use strict'; 

  function showItem($rootScope,$compile,$rootElement,$state,$stateParams){
    return {
      scope: {
        item: '=', 
        module: '=',
        title: '='
      }, 
      restrict:'E',  
      controller: function  ($scope, $element, $attrs,$rootScope,$compile,$rootElement,$state,$stateParams){
        var vm =this ;

          angular.forEach($scope.item, function(valueField,field){
            if ( field.indexOf('id_')!== -1 ) {  
              delete $scope.item[field] ;
            }; 
            if (field.indexOf('estado')!== -1) {  $scope.item[field] = (valueField==='1')?'Activo':'No ctivo'; };
          });

        $rootScope.$on('createIconEdit',function(e){
          var iconEdit   = $rootScope.element("<icon data-icon='pencil' data-action='edit'></icon>"); 
          $compile(iconEdit)($scope); 
          $rootScope.$emit('removeIconEdit'); 
          $rootElement.find('header').find('icon').eq(0).after( iconEdit );   
        });
          
        $rootScope.$on('editState',function(e){
          $state.go('^.edit',{id:$stateParams.id});
        });
      },
      controllerAs:'vm',
      templateUrl: 'views/show.html',
      compile: function(){
        return { 
          pre: function preLink(scope, element, iAttrs, vm) {  
            $rootScope.$emit('changeIcon',{oldAction:'sidenavLeft', newAction:'back', newIcon:'arrow-left'}); 
            $rootScope.$emit('changeAppbar', 'default' );
            $rootScope.$emit('hideActionNew'); 
            $rootScope.$emit('changeTitleAppbar', scope.module.toUpperCase()+': '+scope.title.toUpperCase() ); 
            $rootScope.$emit('createIconEdit');   
          }, 
          post: function postLink(scope, element, iAttrs, vm) {
            
          }
        };
      }
    };
  }; 


  yemd.directive('showItem',showItem);    
})(yemd);
 
