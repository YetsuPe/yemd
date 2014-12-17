
angular.module('yemd')
	.directive('toolbar',toolbar);

function toolbar($yemd, $rootScope, $verge){
		
	return {
			scope: {
				type:'@', //extend, default'
				name: '@'
			}, 
			controller: function  ($scope, $element, $attrs, $yemd, $rootScope, $verge){
				
				var vm =this;

				$element.attr('class','toolbar--default');

				$rootScope.$on('changeTitleToolbar',function(event, name, newTitle){ 
					if ( $attrs.toolbar === name ) { $element.find('.toolbar__title').text(newTitle);  }; 
	      });
	        	
	      $rootScope.$on('changeTypeToolbar', function(e, name, className){ 
	      	
	      	if ( $attrs.toolbar === name ) { 
	      		$element.attr( 'class', 'toolbar--'+ className  );
	      	};

				});

	      $rootScope.$on('hideToolbar', function(e, name){
	      	if ( $attrs.toolbar === name ) {
	      		$element.addClass('hide');
	      	};
	      	
	      });

	      

	      this.resizeWindow =  function() {
	      	var icons = $element.find('[data-icon]'),
	      			title = $element.find('.toolbar__title');

	      	var marginLeft = ( $verge.viewportW() < $yemd.mqMedium)? 16: 24,
	      			width= ( $verge.viewportW() < $yemd.mqMedium)?$verge.viewportW() - 16 :$verge.viewportW() - 24;

	      	marginLeft += 'px';
	      	width += 'px';

	      	if ( icons.length > 0 ){

	      		if( $verge.viewportW() < $yemd.mqMedium && $element.attr('class') === 'toolbar--default' ){ 
	      		 	marginLeft =72;
	      		}else if( $verge.viewportW() >= $yemd.mqMedium && $element.attr('class') === 'toolbar--default' ){
	      			marginLeft =80;
	      		}else if( $verge.viewportW() < $yemd.mqMedium && $element.attr('class') === 'toolbar--extend' ){ 
	      		 	marginLeft =72;
	      		}else if( $verge.viewportW() >= $yemd.mqMedium && $element.attr('class') === 'toolbar--extend' ){
	      			marginLeft = 104;
	      		};

	      		width = (icons.length === 1)? $verge.viewportW()  - marginLeft : ( $verge.viewportW() - ( 48 *  (icons.length - 1 ) ) ) - marginLeft;

	      		width += 'px';
	      		marginLeft += 'px';

	      	}

	      	title.css({
	      		'padding-right': ( $verge.viewportW() < $yemd.mqMedium)?16:24,
	      		'width': width ,
	      		'margin-left' : marginLeft
	      		} 
	      	);
	      	
	      };

	      this.resizeWindow();

	      $rootScope.$on('resizeWindow', function(e){
	      	vm.resizeWindow();
	      	
	      });

			},
			compile: function(tElement, tAttrs){

				return {
	        pre: function preLink(scope, element, attrs, vm) {
		      	
	        },  
	        post: function postLink(scope, element, attrs, vm) {
						

	        }
	      };
			}
	};

};
