
angular.module('yemd')
	.factory('checkWebpage', function( $yemd ) {

		return function(component){

			if ( $yemd.webPage && $yemd.viewportW() >= $yemd.webPageStartMQ && $yemd.leaveBehaviorComponents.indexOf(component)!== -1 ) {
		  	return true;
		  }else if($yemd.viewportW() < $yemd.webPageStartMQ){
		  	return true;
		  }else{
		  	return false;
		  };

		};

	})

	.factory('checkVersionApp', function( $yemd ) {

		return function(component){

			if ( $yemd.webPage ) {

				if ( $yemd.viewportW() >= $yemd.webPageStartMQ || $yemd.webPageMobile ) {
					angular.element('body').removeClass($yemd.classMaster );
      		angular.element('body').addClass( $yemd.webPageClass );
				} else {
					angular.element('body').removeClass( $yemd.webPageClass );
      		angular.element('body').addClass( $yemd.classMaster  );
				}

				if ($yemd.forceYemd) {
					angular.element('body').removeClass( $yemd.webPageClass );
      		angular.element('body').addClass( $yemd.classMaster  );
				};

			} else {
				angular.element('body').removeClass( $yemd.webPageClass );
      	angular.element('body').addClass( $yemd.classMaster  );
			}

		};

	}); 
	