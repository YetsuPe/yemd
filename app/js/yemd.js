angular.module('yemd', []);

angular.module('yemd')
  .provider('$yemd', $yemdProvider )
  .run(initYemd);

function $yemdProvider(){

  var isWebPageTo = false,
      isWebPageMobile = false,
      forceYemd = false,
      webPageStartMQ = 1024;
      leaveBehaviorComponents = [];

  this.setWebPage = function(band){ isWebPageTo = band; };
  this.setWebPageMobile = function(band){ isWebPageMobile = band };
  this.setWebPageStartMQ = function(bp){ webPageStartMQ = bp; };
  this.setLeaveBehaviorComponents = function(components){ leaveBehaviorComponents = components; };

  this.$get = function($rootScope, $verge){

    return { 
      
      mqMedium: 768,
      mqLarge: 1200,

      
      classMaster: 'yemd', 
      forceYemd: forceYemd, // default : false

      //Usefull  for hibrid apps
      webPage: isWebPageTo, // default : false
      webPageMobile: isWebPageMobile,
      webPageStartMQ: webPageStartMQ,
      webPageClass: 'no-yemd',
      leaveBehaviorComponents: leaveBehaviorComponents,

      //Toolbar
      toolbarIsExtend: false,

      viewportW : function() { return $verge.viewportW(); } ,
      viewportH : function() { return $verge.viewportH(); } ,

      //function 
      toggleSidenav: function( sidenav, toggle ){ $rootScope.$emit('toggleSidenav', sidenav, toggle); }
    };

  }

}

function initYemd ( $yemd, $rootScope, checkVersionApp, $window ) {

  checkVersionApp();

  $rootScope.$on('resizeWindow', function(e){

    checkVersionApp();

  });

  $window.onresize = function(event) {
    $rootScope.$emit('resizeWindow');
  }

}

