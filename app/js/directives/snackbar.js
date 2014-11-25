'use strict';
angular.module('yemd')
	.directive('snackbar', snackbar);

function snackbar ($rootScope,$timeout){

    return {
      scope:{}, 
      restrict: 'C',
      compile:function(){
        return {
          post: function postLink(scope,element,attrs){

            $rootScope.$on('showSnackbar',function(event,message){
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

  } 