 (function(angular,svg){
  'use strict'; 

  angular.module('yemd',[])  
  .run(function ($rootScope) { 
    // components 
    var body     = angular.element( document.getElementsByTagName('body') ),
        snackbar = angular.element("<div class='snackbar'></div>"),
        overlay  = angular.element("<div class='overlay'></div>"); 

    body.append( [overlay, snackbar] );

    //config
    $rootScope.yemd= {
      pristine: true, 
      search:{
        value:'Buscar...'
      },
      //appbar 
      appbar: {
        title: 'Yemd Title',
        type:'normal'// 'normal','extend'
      },
      //action
      action:{
        type:'float',
        icon:'plus'
      },
      toggleSidenav:false,
      toggleOverlay: false,
      toggleSnackbar: {
        status:false,
        message: ''
      },
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
      controllerAs:'vm',
      require: ['ngModel'], // Array = multiple requires, ? = optional, ^ = check parent elements
      restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
      // template: '',
      // templateUrl: '',
      // replace: true,
      // transclude: true,
      // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
      link: function($scope, element, attrs,model  ) {
         
        var labelHtml="<label class='valid'>"+attrs.placeholder+"</label>",
            errorHtml="<label class='invalid'>error</label>",
            fieldsetHtml="<fieldset></fieldset>";

        var label      = $(labelHtml)    || angular.element(labelHtml)   ,
            error      = $(errorHtml)    || angular.element(errorHtml)   ,
            fieldset   = $(fieldsetHtml) || angular.element(fieldsetHtml)  ,
            placeholder= attrs.placeholder; 

        element.wrap(fieldset);  

        var auxShow=true;
        element.on('keyup',function(){
          if (attrs.action==='mainsearch') {  
            $scope.model = model[0].$modelValue  ;
            //console.log($scope.model);
          }; 
          /*
          if ( model.$dirty  ) {  
            element.parent('fieldset').addClass("focus"); 
          }; 
          if ( model.$dirty && model.$valid && model.$viewValue ==="" ) {  
            element.parent('fieldset').removeClass('focus');
          };  

          if( model.$valid && auxShow ){ 
            //** remove label invalid **
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
            //** remove label valid **
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
          */
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
        /**/
      }
    };
  }])//E
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
  .directive('snackbar',['$rootScope','$animate','$timeout',function($rootScope,$animate,$timeout){
    return {
      restrict: 'AC',
      scope:{},
      controller: function($scope , $element, $attrs, $rootScope,$animate,$timeout){ 
        $rootScope.$watch('yemd.toggleSnackbar.status', function() {
          if ( $rootScope.yemd.toggleSnackbar.status ) {
            $element.text($rootScope.yemd.toggleSnackbar.message); // message
            $animate.removeClass($element,'hide');
            $animate.addClass($element,'show');

            $timeout(function(){
              $animate.removeClass($element,'show');
              $scope.$apply(function () { 
                $rootScope.yemd.toggleSnackbar={ status:false, message: '' };
              });   
            }, 1500); //time snackbar show
          }/*else{ 
            $element.text(""); // message
            $animate.removeClass($element,'show');
            $animate.addClass($element,'hide'); 
          }*/;
        });  
      },
      link:function(scope,element,attrs){

      }
    };
  }]) 
  .directive('icon',['$rootScope','$compile','$rootElement','$state',function($rootScope,$compile,$rootElement,$state){
    return {
      restrict: 'EC',
      scope: {
        //url:'@name',
        //color: '@',
        icon: '@'//,
        //action:'@'
      }, 
    //require: 'appbar',
      controller: function($scope , $element, $attrs, $rootScope,$compile,$rootElement,$state){  
        //$scope.folderIcons = ( $scope.icon === '' || typeof($scope.icon) === 'undefined' )? $rootScope.yemd.folderIcons : "folder of Icons to set for the user" ;
        var vm = this;
        vm.path= $rootScope.yemd.folderIcons + $scope.icon+'.svg';
 
         
        //create the search input
        if($element.data('action')==='search'){ 
          //$scope.ngModelSearch= $rootScope.yemd.search.value;
          $scope.searchMode="FFFF";
          var formHtml= "<form name='searchMain' class='form-search'></form>",
              search  = "<input type='search' name='searchAppbar' placeholder='Buscar...' ng-model='searchModel' data-action='mainsearch' />",
              form= jQuery(formHtml) || angular.element(formHtml); 

          //inject ng-model value
          var linkFn = $compile(search);//2
          var elementL= linkFn($scope);//3
          form.html(elementL); 
          $rootElement.find('header').prepend(form);
        }




        $scope.changeAction=function(elements, icon){
          angular.forEach(elements, function(nodeIcon,index){
            nodeIcon= $(nodeIcon) || nodeIcon;
            var nodeIconAction= nodeIcon.data('action') ;
            //console.log(menu);
            if ( nodeIconAction === icon.action ) { 
              if ( typeof(icon.newIcon)!=='undefined') {
                var iconHtml= "<img src='"+ $rootScope.yemd.folderIcons+ icon.newIcon +".svg' />",
                newIcon= jQuery(iconHtml) || angular.element(iconHtml); 

                nodeIcon.append(newIcon); //apend img 
                

                nodeIcon.addClass('enterNewIcon');
                nodeIcon.find('span').addClass('show'); //ripple effect
                nodeIcon.find('svg').replaceWith( svg( nodeIcon.find('img') ) );  
                setTimeout(function(){
                  nodeIcon.removeClass('enterNewIcon');
                  nodeIcon.find('span').removeClass('show'); //ripple effect
                },750);

                nodeIcon.data('action', icon.newAction);  
              };
            };
          });
        };
        $scope.pattern=function(namePattern){
          //console.log("change icon");
          if ( namePattern==='AppbarSearch') {
            var appbar= $rootElement.find('header'), 
                iconsInAppbar = appbar.find('icon');

            angular.forEach(iconsInAppbar,function(nodeIcon,index){
              nodeIcon= $(nodeIcon) || nodeIcon;
              if ( nodeIcon.data('action')==='menu' ||  nodeIcon.data('action')==='search' ) {
                if ( nodeIcon.data('action')==='menu' ) { $scope.changeAction(iconsInAppbar,{action:'menu',newIcon:'arrow-left',newAction:'back'}); };
                if ( nodeIcon.data('action')==='search' ) { 
                  nodeIcon.addClass('searchActiveEnter');
                  $scope.changeAction(iconsInAppbar,{action:'search',newAction:'searchActive'}); 

                };
                /**** Action Main search    * use form>input datalist overlay * ***/
                appbar.find('form').addClass('show'); 
                appbar.find('form').find('input').eq(0).focus(); //focus input search
                appbar.find('ul').addClass('show enter'); 
              }else{
                nodeIcon.addClass('hide');
              };
            });
            $scope.$apply(function () { 
              $rootScope.yemd.pristine = false ;
              $rootScope.yemd.toggleOverlay = ($rootScope.yemd.toggleOverlay)?false: true ;
              console.log("change overlay");
            }); 
          };
          
        }; /*
        $element.on('click',function(e){
          var rippleHtml = "<span class='ripple'></span>",
             ripple =   $(rippleHtml) || angular.element(rippleHtml);
             //console.log($element.find('span').length,typeof($element.find('span')) );
              $element.html(ripple);

            if(!ripple.offsetHeight && !ripple.offsetWidth) { 
                //console.log(e,e.target.tagName); 
                var size = Math.max(e.target.offsetWidth, e.target.offsetHeight);
                ripple.css('width' , size + 'px');  //ripple.style.width = size + 'px';
                ripple.css('height', size + 'px');  //ripple.style.height = size + 'px';
            }
            ripple.removeClass('animate');
            var x = e.pageX;
            var y = e.pageY;
            x = x - this.offsetLeft - ripple.offsetWidth / 2;
            y = y - this.offsetTop - ripple.offsetHeight / 2;
 
            ripple.css({ 'width': x + 'px', 'height': y + 'px' });
            ripple.addClass('animate');
            //console.log(ripple);
        });*/
        this.touchClick=function(event){  
          /** riple radial**/
          var element = jQuery(this) || this, ripple = element.find('span');
          ripple.addClass('show');
          setTimeout(function(){
            ripple.removeClass('show');
          } ,750);

          //type
          var action= $element.data('action') ;
          if (  action ==="menu" ) {   
            $scope.$apply(function () { 
              $rootScope.yemd.toggleSidenav = ($rootScope.yemd.toggleSidenav)?false: true ;
              $rootScope.yemd.pristine = false ;
            });  
          }else if( action ==="back"){
             
          }else if( action ==="searchActive"){
            console.log("search Active");
          }else if( action ==="search"){ 
            $scope.pattern('AppbarSearch');
          }
          else if( action ==="refresh"){
            $state.reload(); /////////////////////////// caution 
            console.log("reload");
          };

        }; 
      },
      controllerAs:'vm',
      link: function  ($scope, element, attrs,vm){   
        var iconHtml= "<img src='"+ vm.path +"' />",
            rippleHtml= "<span class='ripple--radial'></span>",
            icon= jQuery(iconHtml) || angular.element(iconHtml); 
        element.html(icon);
        element.html( svg( element.find('img') ) );  
        element.prepend( $(rippleHtml) || angular.element(rippleHtml)  );
        //ripple effect
        element.on('click'     ,vm.touchClick );
        element.on('touchstart',vm.touchClick );
      }
    };
  }])//EC
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
          var iconHtml = "<icon class='appbar__icon' data-action='search' data-icon='search'> </icon>" , 
              icon= jQuery(iconHtml) || angular.element(iconHtml), 
              linkIcon = $compile(icon);

          vm.iconSearch= linkIcon($scope);
           
        },
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'EC', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '', 
        // replace: true,
        // transclude: true,
        compile: function(tElement, tAttrs,vm){ 
          return {
            pre : function  (scope, iElm, iAttrs, vm){
              iElm.closest('body').find('header').find('h1').after(vm.iconSearch); //Add icon search
              if ( vm.datalist ){   
                var  dataListHtml="<ul class='datalist'></ul>",
                    datalist= jQuery(dataListHtml) || angular.element(dataListHtml) ; 
                angular.forEach(vm.datalist, function(row,index){
                  var optionHtml="<li class='datalist__item'>"+row.value+"</li>",
                      option= jQuery(optionHtml) || angular.element(optionHtml) ; 
                  this.append(option);  
                }, datalist);
                //vm.datalist=datalist;
                iElm.closest('body').find('header').find('form').after(datalist);
              }else{
                console.log("not set datalist");
              };    
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
  }])
  /*
  directive('', ['', function(){
    // Runs during compile
    return {
      // name: '',
      // priority: 1,
      // terminal: true,
      // scope: {}, // {} = isolate, true = child, false/undefined = no change
      // controller: function($scope, $element, $attrs, $transclude) {},
      // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
      // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
      // template: '',
      // templateUrl: '',
      // replace: true,
      // transclude: true,
      // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ 
          return function linking(scope, elm, attrs){
    
          }
        })
      ),
      link: function($scope, iElm, iAttrs, controller) {
        
      }
    };
  }])*/
  .directive('appbar',['$rootScope', function($rootScope){
    return {
      restrict: 'EAC',
      scope:{
        title: "=",
        type: '=',
        action: '='
      },   
      controller: function appbar ($scope , $element, $attrs, $rootScope){ 
        /***** title *****/
        var title = $element.find('h1').text() ;
        //console.log($scope.title,$scope.type);
        if ( typeof($scope.title) !== 'undefined'  ) {
          $scope.titleR= $scope.title; //dinamic
        } else if( title !==""){
          $scope.titleR = title;
        }else{
          $scope.titleR= $rootScope.yemd.appbar.title; //default
        }; 
        $element.find('h1').text( $scope.titleR ); //non dinamic
 
        /***** type  *****/
        var typePristine= true ;
        $scope.typeR= (typeof($scope.type) !== 'undefined')? $scope.type : 'normal' ; 

        /***** whatchers ***/
        $scope.$watch('title', function() { //dinamic Title
          $element.find('h1').text( $scope.title );
        });
        $scope.$watch('type', function() { //dinamic Type of appbar
          if ( !typePristine ) {
            $element.hasClass('extend') ? $element.removeClass('extend') : $element.addClass('extend') ;
          }else{
            typePristine=false;
          };
        });
      },
      link: function ($scope, element, iAttrs ) {   
        //var title = (element.find('h1') );
        //title.text( (title.text()!=="")? title.text() : $scope.title );
      },
      controllerAs:'appbar'
    };
  }])
  .directive('action',['$rootScope', function($rootScope){
    return {
      restrict: 'EC',
      scope:{ 
        type: '@',
        typeBind: '=',
        icon: '@',
        iconBind: '=',
        action: '&'
      },  
      //templateUrl:'_components/_appbar.html', 
      controller: function($scope , $element, $attrs, $rootScope){   
        //type
        //console.log($scope.typeBind)
        if ( typeof($scope.typeBind)!=='undefined' ) {
          console.log("Binding type of action"); 
          //$element.addClass($scope.typeBind);
          }else if( typeof($scope.type)!=='undefined' ){
          $element.addClass($scope.type);
          }else{
            console.log("default type of action"); 
          //$element.addClass($rootScope.yemd.action.type);
        };
        //icon
        var pathIcon='';
        if ( typeof($scope.iconBind)!=='undefined' ) {
          pathIcon= $rootScope.yemd.folderIcons+ $scope.iconBind;
          }else if( typeof($scope.icon)!=='undefined' ){
          pathIcon= $rootScope.yemd.folderIcons+ $scope.icon;
          }else{
          pathIcon= $rootScope.yemd.folderIcons+ $rootScope.yemd.action.icon;
        };

        var actionHtml= "<img src='"+ pathIcon +".svg'>" ,
            actionIcon= jQuery(actionHtml) || angular.element(actionHtml);
 
        $element.append(actionIcon);
        $element.html( svg(actionIcon) );
        
        /***** Dinamic  *****/
        var typePristine= true ;  //what detect like change the initializer 
        $scope.$watch('typeBind', function() { //dinamic Type of appbar
          if ( !typePristine ) {
            console.log('change type',$scope.typeBind,$rootScope.yemd.action.type); 
            $element.attr('class','').addClass("action " + $scope.typeBind);//     addClass();
          }else{
            typePristine=false;
          };  
        });
      },
      link: function ($scope, element, iAttrs ) {   
        element.addClass($scope.type);
        //var title = (element.find('h1') );
        //title.text( (title.text()!=="")? title.text() : $scope.title );
      }
    };
  }])
  .directive('tooltip',[function(){
    return {
      restrict: 'A',
      scope:{
        title: "@"
      },  
      //template:'<div class="tooltip"></div>', 
      link: function ($scope, element, iAttrs ) {   
        var contentHtml= "<div class='tooltip'>"+$scope.title+"</div>",
        tooltip= jQuery(contentHtml ) || angular.element(contentHtml);
        element.append( tooltip );

        element
        .on('mouseenter',function(){ 
            element.find('div').eq(-1).removeClass('hide'); 
            element.find('div').eq(-1).addClass('showD show');  
        })
        .on('mouseleave',function(){ 
            element.find('div').eq(-1).removeClass('show'); 
            element.find('div').eq(-1).addClass('hide'); 
            setTimeout(function(){ 
              element.find('div').eq(-1).removeClass('showD hide'); 
            }, 750); 
        });
      }
    };
  }])
  .directive('sidenav',['$animate','$rootScope','$timeout',function($animate,$rootScope,$timeout){
    return {
      restrict: 'EAC',
      require: '?ngRepeat',
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
          console.log("click XD");
          $scope.$apply(function () {
            $rootScope.yemd.toggleSidenav = false ;
            $rootScope.yemd.toggleOverlay = false ;  
          });   
        });
      },
      link: function (scope, elem, attrs) { 
        var h = jQuery( '.sidenav' ).width() || Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        elem.find('figure').css( 'height',h*(9/16)+"px" );
      }
    };
  }]);
 
})(angular,SVGInjector);
 