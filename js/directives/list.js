(function(angular,svg){ 
	angular.module('yemd',[])
	.directive('list', ['$rootScope','$rootElement','$compile','$location',function($rootScope,$rootElement,$compile,$location){
      // Runs during compile
      return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: {
          items: '=',
          datalist: '='
        }, // {} = isolate, true = child, false/undefined = no change
        controller: function($scope, $element, $attrs, $rootScope,$rootElement,$compile) { 
          var vm = this;
          vm.items= $scope.items || false;
          vm.datalist= $scope.datalist || false;
          vm.view= $rootScope.yemd.view;  

          //create the icon search 
          vm.createIconSearch=function(){
            var iconHtml = "<icon class='appbar__icon' data-action='search' data-icon='search'> </icon>" , 
            icon= jQuery(iconHtml) || angular.element(iconHtml), 
            linkIcon = $compile(icon); 
            return linkIcon($scope);
          };
          vm.createDatalist=function(){
            var  dataListHtml="<ul class='datalist'></ul>",
                 datalist= jQuery(dataListHtml) || angular.element(dataListHtml) ; 
            angular.forEach(vm.datalist, function(row,index){
              var optionHtml="<li class='datalist__item'>"+row.value+"</li>",
              option= jQuery(optionHtml) || angular.element(optionHtml) ; 
              this.append(option);  
            }, datalist); 
            return datalist;
          };
           
        },
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'EC', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '', 
        // replace: true,
        // transclude: true,
        compile: function(tElement, tAttrs,vm){ 
          return {
            pre : function  (scope, iElm, iAttrs, vm){
              iElm.closest('body').find('header').find('h1').after( vm.createIconSearch() ); //Add icon search 
              vm.datalist ? iElm.closest('body').find('header').find('form').after( vm.createDatalist() ) :console.log("not set datalist Dinamic");
            } ,
            post: function   (scope, iElm, iAttrs, vm){

            }
          };
        }/*,
        link: function($scope, iElm, iAttrs, vm) {
          console.log(iElm,vm.datalist);
          iElm.prepend(vm.datalist);
        }*/
      };
  }]);
})(angular);