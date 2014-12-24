
angular.module('yemd')
	.directive('toolbar',toolbar);

function toolbar($yemd, $rootScope){
	
	return function link (scope, element, attrs){

		element.attr('class','toolbar--default');

		var resizeWindow =  function() {

	      	var icons = element.find('[data-icon]'),
	      			title = element.find('.toolbar__title');

	      	var marginLeft = ( $yemd.viewportW() < $yemd.mqMedium)? 16: 24,
	      			width= ( $yemd.viewportW() < $yemd.mqMedium)?$yemd.viewportW() - 16 :$yemd.viewportW() - 24;

	      	if ( icons.length > 0 ){

	      		if( $yemd.viewportW() < $yemd.mqMedium && element.attr('class') === 'toolbar--default' ){ 
	      		 	marginLeft =72;
	      		}else if( $yemd.viewportW() >= $yemd.mqMedium && element.attr('class') === 'toolbar--default' ){
	      			marginLeft =80;
	      		}else if( $yemd.viewportW() >= $yemd.mqMedium && element.attr('class') === 'toolbar--2rows' ){
	      			marginLeft =80;
	      		}else if( $yemd.viewportW() < $yemd.mqMedium && element.attr('class') === 'toolbar--extend' ){ 
	      		 	marginLeft =72;
	      		}else if( $yemd.viewportW() >= $yemd.mqMedium && element.attr('class') === 'toolbar--extend' ){
	      			marginLeft = 104;
	      		};

	      		width = (icons.length === 1)? $yemd.viewportW()  - marginLeft :  ($yemd.viewportW() - marginLeft) - ( (48 + 4 ) *  (icons.length - 1 ) )  ;

	      	}

	      	angular.forEach(icons , function(value, index){
	      		if ( index === 0 ) {
	      			$(value).css({
	      				left:  ( $yemd.viewportW() < $yemd.mqMedium)? 4 : 8 
	      			});
	      		}else{
	      			var rightB = ( $yemd.viewportW() < $yemd.mqMedium)? 4 : 8 ;
	      			$(value).css({
	      				left: 'auto',
	      				right: index * rightB + ( (index -1) * 48 )
	      			});

	      		};
	      		
	      	});

	      	title.css({
	      		'padding-right': 4 ,//( $yemd.viewportW() < $yemd.mqMedium)?16:24,
	      		'width': width ,
	      		'margin-left' : marginLeft
	      		} 
	      	);
	      	
	  };

	  resizeWindow();

	  $rootScope.$on('resizeWindow', function(e){
	   resizeWindow();
	  });

	  $rootScope.$on('changeTitleToolbar',function(event, name, newTitle){ 
			if ( attrs.toolbar === name ) { element.find('.toolbar__title').text(newTitle);  }; 
	  });
	        	
	  $rootScope.$on('changeTypeToolbar', function(e, name, className){ 
	    if ( attrs.toolbar === name ) {  element.attr( 'class', 'toolbar--'+ className  ); };
		});

	  $rootScope.$on('hideToolbar', function(e, name){
	    if ( attrs.toolbar === name ) { element.addClass('hide'); }; 	
	  });
	      
	  $rootScope.$on('addAction', function(e, name, action){
      if ( attrs.toolbar === name ) {
	      element.attr( 'class', 'toolbar--extend'  );
	      element.append(action);
	      $yemd.toolbarIsExtend = true;
	      $rootScope.$emit('toolbarIsExtend');
	    };
	  });

	  $rootScope.$on('removeAction', function(e, name){
			if ( attrs.toolbar === name && $yemd.toolbarIsExtend ) {
	      element.find('.action').remove(); 
	      element.attr( 'class', 'toolbar--default'  );
	      $yemd.toolbarIsExtend = false;
	      $rootScope.$emit('toolbarIsExtend');
	    };
	  });

	};

};
