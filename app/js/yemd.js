angular.module('yemd', []);

angular.module('yemd')
  .provider('$yemd', $yemdProvider )
  .run(initYemd);

function $yemdProvider(){

  this.$get = function($rootScope){
    return { 
      
      mqMedium: 768,
      mqLarge: 1200,

      /*
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
      },
      canvas: {
        className: ''
      },
      */
      //function 
      toggleSidenav: function( sidenav, toggle ){
        $rootScope.$emit('toggleSidenav', sidenav, toggle)
      }
    };
  }

}

function initYemd ($rootElement, $rootScope) {

  var snackbar = angular.element("<div class='snackbar'><p></p></div>"), 
      overlay = angular.element("<div class='overlay'> </div>"),  
      modal = angular.element("<div class='modal'> </div>"),  
      action = angular.element("<div data-action></div>");  

  $rootElement.find('body').append( action );
  $rootElement.find('body').append( modal );   
  $rootElement.find('body').append( overlay );   
  $rootElement.find('body').append( snackbar ); 


}

