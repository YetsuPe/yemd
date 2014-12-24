
angular.module('yemd')
		.directive('card',card);

function card($rootScope, $yemd, checkWebpage){
	var componentName = 'card';
	return {
		scope: {

		},
		controller: function($element, $attrs, $yemd, checkWebpage){

			var type = ($attrs.card==='')?'':'--'+$attrs.card;
			$element.addClass('card'+type);

			this.figures = function (marginPics) {

				if ( !checkWebpage(componentName) ) { return false; };

	    	$element.find('.card__content').children('div').remove(); //reset
	    	$element.find('.card__content').css('display', 'flex'); 

	    	var pics = $element.find('img');
	    	var widthContainer = $element.find('.card__content').width() - marginPics ;
	    	var row = parseInt($element.data('columns')) || 3 ; //default 3 columns

	    	angular.forEach( pics , function(value, index){

	    		var image = $('<div> <span>'+ $(value).attr('alt') +'</span> </div>');

	    		image.css({
	    			backgroundImage: 'url('+$(value).attr('src')+')',
	    			backgroundSize: 'cover',
	    			width : ( widthContainer / row ) + 'px',
	    			height: ( widthContainer / row ) + 'px'
	    		});

	    		$element.find('.card__content').append( image )  ;
	    		
	    	});

	    	$element.find('img').hide();
	    }

	    this.cover = function() {

	    	if ( !checkWebpage(componentName) ) { return false; };
	    	console.log($element.width());
	    	$element.find('.card__cover').css({
	    		height: $element.width() * (9/16),
	    		backgroundSize: 'cover',
					'background-image': "url('"+ $element.find('.card__cover__image').attr('src')+"')" 
				});
				$element.find('.card__cover__image').hide();
	    }

	    this.avatar = function(){

	    	if ( !checkWebpage(componentName) ) { return false; };

	    	$element.find('.card__photo').css({ 
	    		backgroundSize: 'cover',
	    		backgroundImage: "url('"+ $element.find('.card__photo__image').attr('src')+"')"  
	    	});

	    	$element.find('.card__photo__image').hide();
	    }
	    
		},
		link: function (scope, element, attrs, cardCtrl ) {

	    if ( attrs.card === 'square-picture' ) {
	      element.css({
					'background-image': "url('"+ element.find('.card__cover__image').attr('src')+"')" 
				});
	    };

	    if ( attrs.card === 'figures' ) { cardCtrl.figures(24); };

	    if ( attrs.card === 'cover' ) { cardCtrl.cover(); };

	    if ( attrs.card === 'figure' ) { cardCtrl.cover(); };

	    if ( attrs.card === 'avatar' ) { cardCtrl.avatar(); };

	    $rootScope.$on('resizeWindow', function(e) {
        if ( attrs.card === 'figures' ) { cardCtrl.figures(8); };
        if ( attrs.card === 'cover' || attrs.card === 'figure'  ) { cardCtrl.cover(); };
        if ( attrs.card === 'avatar' ) { cardCtrl.avatar(); };
      });
						
	  }
	}
}; 
