function $settingsProvider(){
	this.global=  {
		fontSize       : '16px',
		colorPrimary   : 'blue',
		colorSecondary : 'red'
	};  

  this.folderIcons = 'icons/'; //default
  this.snackbar    = { toggle: false }
  this.$get=$get;

  $get.$inject = ['$rootScope'];
  function $get($rootScope){
  	
  }

};
angular.module('yemd')
	.provider('$settings', $settingsProvider);