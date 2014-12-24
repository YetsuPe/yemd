
angular.module('yemd')
	.directive('canvas', canvas);

	function canvas($rootScope, checkWebpage, $yemd, $window){
		var componentName = 'canvas';
		return {
			scope:{
				name: '@'
			},
			restrict: 'C',
			controller: function($scope, $element, $attrs, $rootScope, checkWebpage, $yemd, $window){

				$element.attr('class','canvas--default');

				var canvas = this;

				canvas.resizeWindow =function() {

					if ( !checkWebpage(componentName) ) { return false; };

					if ( $yemd.viewportW() >= $yemd.mqMedium) {

						if ( $yemd.toolbarIsExtend  ) { 
							$element.removeClass('canvas--block').addClass('canvas--default');
						}else {

							$rootScope.$emit('changeTypeToolbar','appbar', '2rows');
							$element.removeClass('canvas--default').addClass('canvas--block');
						};
						
					} else {
						if ( !$yemd.toolbarIsExtend  ) { 
							$rootScope.$emit('changeTypeToolbar','appbar', 'default');
						}
						$element.removeClass('canvas--block').addClass('canvas--default');
						
					}

				}

				canvas.resizeWindow();

				$rootScope.$on('resizeWindow', function(e){
					canvas.resizeWindow();
				});

				$rootScope.$on('toolbarIsExtend', function(e){
					canvas.resizeWindow();
				});

			}
		}
	}
