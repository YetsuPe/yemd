(function(yemd,svg){  
 
	yemd.factory('injectSvg', ['$rootScope','$rootElement', function($rootScope,$rootElement){
		return function(iconName,toElement){  
			var iconNode = $rootScope.element("<img src='"+$rootScope.yemd.folderIcons+iconName+".svg' />"); 
			toElement.append(iconNode); 
			svg( toElement.find('img') );  
		};
	}]);

})(yemd,SVGInjector);