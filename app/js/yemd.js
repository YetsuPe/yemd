'use strict';  

angular.module('yemd', []);

angular.module('yemd')
  .provider('$yemd', $yemdProvider )
  .run(initYemd);

function $yemdProvider(){

  this.$get = function(){
    return { 
      sidenav: {
        left: {
          show : false,
          toggle: false,
          icon: 'mdfi_navigation_menu'
        },
        right :{
          show : false,
          toggle: false,
          icon: 'mdfi_navigation_menu'
        }
      },
      action: {
        show: false,
        type: 'float',
        icon: 'mdfi_content_add'
      }
    };
  }

}

function initYemd ($rootElement) {
  var snackbar = angular.element("<div class='snackbar'><p></p></div>"), 
      overlay = angular.element("<div class='overlay'> </div>"),  
      action = angular.element("<div data-action> </div>");  

  $rootElement.find('body').append( action );
  $rootElement.find('body').append( overlay );   
  $rootElement.find('body').append( snackbar ); 
}
