(function(angular, yemd, svg){  
 'use strict'; 
	yemd.factory('injectSvg', ['$yemd', function($yemd){
		return function(iconName,toElement){   
			toElement.append( angular.element("<img src='"+ $yemd.folderIcons + iconName + ".svg' />") ); 
			return svg( toElement.find('img') );  
		};
	}]);

})(angular, yemd, SVGInjector);