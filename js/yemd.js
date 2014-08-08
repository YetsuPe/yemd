// require angular-animate
(function(){
  'use strict';
  angular.module('yemd',['ngAnimate'])
  .directive('yemdList', [function(){
      // Runs during compile
      return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: {
          items: "="
        }, // {} = isolate, true = child, false/undefined = no change
        controller: function($scope, $element, $attrs, $transclude) {

        },
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: '_components/_list.html',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function($scope, iElm, iAttrs, controller) {
          
        }
      };
  }])
  .directive('yemdAppbar',[function(){
      return {
        restrict: 'EA',
        scope:{
          title: "="
        },
        templateUrl:'_components/_appbar.html',
        controller: ['$scope', function($scope){ 
          
        }]
      };
  }])
  .directive('yemdSidenav',[function(){
      return {
        restrict: 'EA',
        scope:{
          title: "="
        },
        templateUrl:'_components/_sidenav.html',
        controller: ['$scope', function($scope){ 

        }],
        link: function($scope, elem, iAttrs, controller) {
          var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
          elem.find('figure').css('height', w*(9/16) +'px');
        }
      };
  }]);

})(angular);
