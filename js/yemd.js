 (function(angular, global){
  'use strict';  

  global.yemd = angular.module('yemd',[])  ;

  yemd.run(function ($rootScope, $rootElement) {   
    $rootScope.element = ( typeof jQuery !== 'undefined' ) ? jQuery : angular.element ; 
    /* components */
    var snackbar = $rootScope.element("<div class='snackbar'></div>"),
        overlay  = $rootScope.element("<div class='overlay'></div>");   
    $rootElement.find('body').append( overlay ); 
    $rootElement.find('body').append( snackbar ); 

    //config inital values

    $rootScope.yemd= {
      settings: {
        fontSize      : '16px',
        colorPrimary  : 'blue',
        colorSecondary: 'red'
      },
      //search
      search:{
        value:'Buscar...'
      },
      //appbar 
      toolbar: {
        appbar: {
          title: 'Yemd',
          type:'default',// 'default','extend'
          isAppbar:true
        }
      },
      //action
      action:{
        type:'float',//float,embed
        icon:'plus'
      },
      //sidenav
      sidenav: {
        left: {
          toggle: false
        } 
      },
      //sidenav
      overlay:{
        show: false
      },
      //icon
      icons:{
        menu:   {
          icon: 'menu',
          involve: 'sidenavLeft' //main
        },
        about:  {icon: 'menu2',involve:'menuAbout'},
        refresh:{icon: 'refresh',involve:'refresh'}
      },
      //sidenav
      snackbar: {
        show:false,
        message: 'Default Snackbar'
      },
      folderIcons: 'icons/' //default
    };   
  });
 
})(angular, window);
 