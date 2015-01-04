
angular.module('yemd')
		.directive('card',card);

function card($rootScope, $yemd, checkWebpage){
	var componentName = 'card';
	return {
		scope: {},
		controller: function($element, $attrs, $yemd, checkWebpage){

			var card = this;

			card.type = ($attrs.card==='')?'':'--'+$attrs.card;
			$element.addClass('card'+ card.type);


			card.figures = function (marginPics) {

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

			card.coverAndPhoto = coverAndPhoto;


			function coverAndPhoto () {

				$element.find('.card__cover').css({
					height: $element.width() * (9/16),
					backgroundImage: "url('"+ $element.find('.card__cover__image').attr('src')+"')"
				});


				$element.find('.card__photo').css({
					backgroundImage: "url('"+ $element.find('.card__photo__image').attr('src')+"')"
				});

				if ( $attrs.card === 'square-picture' ) {
					$element.css({ backgroundImage: "url('"+ $element.find('.card__cover__image').attr('src')+"')" });
				}

				$element.find('.card__photo__image').hide();

				$element.find('.card__cover__image').hide();

			}
	    
		},
		link: function (scope, element, attrs, cardCtrl ) {

			if ( !checkWebpage(componentName) ) { return false; };

			cardCtrl.coverAndPhoto();

	    	if ( attrs.card === 'figures' ) { cardCtrl.figures(24); };

			$rootScope.$on('resizeWindow', function(e) {
				if ( attrs.card === 'figures' ) { cardCtrl.figures(8); };
				cardCtrl.coverAndPhoto();
			});
						
	  }
	}
}; 
