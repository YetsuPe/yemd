(function(angular, yemd){ 
  
	yemd
	.directive('snackbar',['$rootScope','$timeout', function($rootScope,$timeout){
    return {
      restrict: 'AC',
      scope:{}, 
      compile:function(){
      	return {
      		post: function postLink(scope,element,attrs){

      			$rootScope.$on('showSnackbar',function(event,message){
		      		console.log(message);
		      		element.removeClass('hide').addClass('show'); 
		      		element.find('p').text(message);  
		      		$timeout(function(){
		      			element.removeClass('show').addClass('hide'); 
		      		}, 1750); 
		      	});

      		}
      	}
      } 
    };
  }]) 
})(angular,yemd);