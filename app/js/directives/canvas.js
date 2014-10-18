(function(angular, yemd){  

	$canvas.$inject = ['$rootScope'];
	function $canvas($rootScope){
		return {
			restrict:'E',
			require: 'uiView',
			compile:function(tElement){
				return {
					pre: function preLink(scope, element, attrs) {   
		      },  
		      post: function postLink(scope, element, attrs) {   
					}
				}
			}
		};
	};

	yemd.directive('canvas',$canvas);

})(angular, yemd);