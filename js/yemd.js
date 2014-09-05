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

  	var folderIcons = 'icons8/' ; //Icon's by VisualPharm

  	this.$get = [function(){
  	  return {
  	  	folderIcons: folderIcons
  	  };

  	}];

  });

})(angular, window);