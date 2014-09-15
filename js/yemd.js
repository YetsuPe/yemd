(function(angular,global){ 
  'use strict';  

  /**
  * 
  * yemd Module
  *
  * Description: directives for ui inspired in material design
  */

  global.yemd = angular.module('yemd', []);

  yemd.provider('$yemd', function $yemdProvider(){

  	this.folderIcons = 'icons8/' ; //Icon's by VisualPharm

  	this.$get = ['$rootElement',function($rootElement){
      var folderIcons= this.folderIcons;

      var snackbar = angular.element("<div class='snackbar'><p></p></div>"), 
          overlay  = angular.element("<div class='overlay'></div>"),
          action   = angular.element("<a class='action'><icon data-icon='plus'></icon></a>");  

      $rootElement.find('body').append( overlay );  
      $rootElement.find('body').append( snackbar ); 
      $rootElement.find('header').append( action ); 

  	  return {
  	  	folderIcons: folderIcons
  	  };
  	}];

    this.setFolderIcons = function(dir){
        this.folderIcons = dir;
    };

  }); 

})(angular, window);