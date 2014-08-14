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
      toggleOverlay: false,
      folderIcons: 'icons/' //default
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
        //console.log( jQuery );
        var labelHtml="<label class='valid'>"+attrs.placeholder+"</label>",
            errorHtml="<label class='invalid'>error</label>",
            fieldsetHtml="<fieldset></fieldset>";

        var label=    ( typeof( jQuery )==="undefined" )? angular.element(labelHtml) : $(labelHtml) ,
            error=    ( typeof( jQuery )==="undefined" )? angular.element(errorHtml) : $(errorHtml) ,
            fieldset= ( typeof( jQuery )==="undefined" )? angular.element(fieldsetHtml) : $(fieldsetHtml) ,
            placeholder=attrs.placeholder; 

        element.wrap(fieldset);  
        var auxShow=true;
        element.on('keyup',function(){
          //console.log( model );  
          if ( model.$dirty  ) {  
            element.parent('fieldset').addClass("focus"); 
          }; 
          if ( model.$dirty && model.$valid && model.$viewValue ==="" ) {  
            element.parent('fieldset').removeClass('focus');
          };  

          if( model.$valid && auxShow ){ 
            /** remove label invalid **/
            error.removeClass('show'); 
            error.addClass('hide'); 
            setTimeout(function(){ 
              error.removeClass('showD hide'); //attrs.placeholder
              element.attr('placeholder',placeholder);
            }, 750);
            //show valid
            element.parent('fieldset').prepend( label );
            label.removeClass('hide'); 
            label.addClass('showD show');
            auxShow=false; 
          };
          if( !model.$valid && !auxShow){ 
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
            element.parent('fieldset').append( error );
            auxShow=true; 
          };
        });  
        if ( attrs.type==="date" || attrs.type==="time"|| attrs.type==="datetime-local" || element[0].tagName==="SELECT" ) {
          
          element.parent('fieldset').addClass('focus'); 
          element.parent('fieldset').prepend( label );
          label.addClass('showD show');
          element.parent('fieldset').append( error );
        };
        if ( attrs.type==="submit" || element[0].tagName==="button" ) {
          element.parent('fieldset').addClass('submit'); 
        }
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
        color: '@',
        icon: '@'
      },
      controller: function($scope , $element, $attrs,$rootScope){  
        $scope.folderIcons = ( $scope.icon === '' || typeof($scope.icon) === 'undefined' )? $rootScope.yemd.folderIcons : "folder of Icons to set for the user" ;
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
        //element.find('img').attr('src', $scope.icon );
        console.log($scope.folderIcons);
        var iconHtml= "<img />";
        var icon = ( typeof( jQuery )==="undefined" )? element.append(angular.element(iconHtml)) : element.append($(iconHtml)) ;
        ( $scope.icon !== '' || typeof($scope.icon) === 'undefined'  )? element.html( svg(element.find('img').attr('src', $scope.icon)) )  : element.html( svg(element.find('img').attr('src',$scope.folderIcons+'/Very_Basic/link.svg') ) ) ;
        //element.html( svg(element.find('img')) ); 
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
          }else if( !$rootScope.yemd.pristine && !$rootScope.yemd.toggleSidenav ) { 
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
 