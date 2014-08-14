 (function(angular,svg){
  'use strict';
  angular.module('yemd',[])  
  .run(function ($rootScope) { 
    var body = angular.element( document.getElementsByTagName('body') ) ; 
    var overlay = angular.element("<div class='overlay'></div>"); 
    body.append( overlay );
    $rootScope.yemd= {
      pristine: true,
      toggleSidenav:false,
      toggleOverlay: false
    }; 
    // Sample
    $rootScope.app={
      form:{
        //usuario:'Skeiter9'
      }
    };
  })
  .directive('input', ['$rootScope','$animate', function($rootScope,$animate){
    // Runs during compile
    return {
      // name: '',
      // priority: 1,
      // terminal: true,
      scope: {}, // {} = isolate, true = child, false/undefined = no change
      controller: function($scope, $element, $attrs, $rootScope) {

      },
      require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
      restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
      // template: '',
      // templateUrl: '',
      // replace: true,
      // transclude: true,
      // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
      link: function($scope, element, attrs, model) {

        var input= element,
            label= angular.element("<label class='valid'>"+attrs.placeholder+"</label>"),
            error=angular.element("<label class='invalid'>error</label>"),
            fieldset=angular.element("<fieldset></fieldset>"),
            placeholder=attrs.placeholder;
 
        element.wrap(fieldset);  
 
        element.on('keyup',function(){
          console.log( model );  
          if ( model.$dirty  ) {
            fieldset.addClass('focus'); 
          }; 
          if ( model.$dirty && model.$valid && model.$viewValue ==="" ) {  
            fieldset.removeClass('focus');
          };  

          if( model.$valid ){ 
            /** remove label invalid **/
            error.removeClass('show'); 
            error.addClass('hide'); 
            setTimeout(function(){ 
              error.removeClass('showD hide'); //attrs.placeholder
              element.attr('placeholder',placeholder);
            }, 750);
            //show valid
            fieldset.prepend( label );
            label.removeClass('hide'); 
            label.addClass('showD show'); 
          }else{ 
            /** remove label valid **/
            label.removeClass('show'); 
            label.addClass('hide'); 
            setTimeout(function(){ 
              label.removeClass('showD hide'); //attrs.placeholder
              element.attr('placeholder',placeholder);
            }, 750);
            //show error
            error.removeClass('hide'); 
            error.addClass('showD show');
            fieldset.append( error );
            
          };
        }); 
        console.log(element);
        if ( attrs.type==="date" || attrs.type==="time"|| attrs.type==="datetime-local" || element[0].tagName==="SELECT" ) {
          
          fieldset.addClass('focus'); 
          fieldset.prepend( label );
          label.addClass('showD show');
          fieldset.append( error );
        };
      }
    };
  }])
  .directive('overlay',['$rootScope','$animate','$timeout',function($rootScope,$animate,$timeout){
    return {
      restrict: 'EAC',
      scope: {},
      controller: function($scope , $element, $attrs,$rootScope,$animate,$timeout){ 
        $rootScope.$watch('yemd.toggleOverlay', function() {
          if (!$rootScope.yemd.pristine && $rootScope.yemd.toggleOverlay ) {
            $animate.removeClass($element,'hide');
            $animate.addClass($element,'showD show');
          }else if( !$rootScope.yemd.pristine && !$rootScope.yemd.toggleOverlay) { 
            $animate.removeClass($element,'show');
            $animate.addClass($element,'hide');
            $timeout(function(){
              $animate.removeClass($element,'showD');
            }, 750);
          }
        });  
        $element.on('click',function(){
          console.log("click overlay");
          $scope.$apply(function () { 
            $rootScope.yemd.toggleSidenav = false ;//all components 
            $rootScope.yemd.toggleOverlay = false ; 
          });   
        });
      },
      link: function  ($scope, element, attrs){   
      }
    };
  }])
  .directive('icon',['$rootScope',function($rootScope){
    return {
      restrict: 'EC',
      scope: {
        url:'@name',
        color: '@'
      },
      controller: function($scope , $element, $attrs,$rootScope){  
        $element.on('click',function(){ 
          if ( $attrs.action==="menu" ) {   
            $scope.$apply(function () { 
                $rootScope.yemd.toggleSidenav = ($rootScope.yemd.toggleSidenav)?false: true ;
                $rootScope.yemd.pristine = false ;
            });  
          }
        });
      },
      link: function  ($scope, element, attrs){ 
        element.html( svg(element.find('img')) ); 
      }
    };
  }])
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
  .directive('appbar',[function(){
    return {
      restrict: 'EAC',
      scope:{
        title: "="
      },  
      //templateUrl:'_components/_appbar.html', 
      link: function ($scope, iElm, iAttrs ) {   
      }
    };
  }])
  .directive('sidenav',['$animate','$rootScope','$timeout',function($animate,$rootScope,$timeout){
    return {
      restrict: 'EAC',
      scope:{
        //toggleSidenav: $rootScope.yemd.toggleSidenav
      },  
      controller: function($scope , $element, $attrs, $animate, $rootScope,$timeout){
        $rootScope.$watch('yemd.toggleSidenav', function() {
          if (!$rootScope.yemd.pristine && $rootScope.yemd.toggleSidenav ) {
            $animate.addClass($element,'enter');   
            $rootScope.yemd.toggleOverlay = ($rootScope.yemd.toggleOverlay)? false: true ;
            console.log($rootScope.yemd.toggleOverlay);
          }else if( !$rootScope.yemd.pristine && !$rootScope.yemd.toggleSidenav ) {
            console.log($rootScope.yemd.pristine);
            $animate.removeClass($element,'enter') ;
            $rootScope.yemd.toggleOverlay = false ;   
          } 
        });
        $element.find('a').on('click',function(e){
          e.preventDefault(); 
          $scope.$apply(function () {
            $rootScope.yemd.toggleSidenav = false ;
            $rootScope.yemd.toggleOverlay = false ;  
          });  
          
        });
      },
      link: function (scope, elem, attrs) {
        var h = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        elem.find('figure').css( 'height',h*(9/16)+"px" ); 
      }
    };
  }]);
 
})(angular,SVGInjector);
 