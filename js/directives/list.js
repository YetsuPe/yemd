(function(yemd){  
  'use strict'; 
  yemd.directive('section',list);

  function list($rootScope){
    return {
      scope: { 
        items:'=', //array of items
        type:'='
      },
      restrict:'E',  
      controller: function  ($scope, $element, $attrs,$rootScope){
        var vm =this ;
        vm.type= $scope.type || 'single-line';
      },
      controllerAs:'vm',
      compile: function(){
        return {
          pre: function preLink(scope, element, iAttrs, vm) {  
            vm.type==='single-line'?element.addClass('list--single-line'):null;
          }, 
          post: function postLink(scope, element, iAttrs, vm) {

          }
        };
      }
    };
  };

})(yemd);

