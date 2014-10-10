(function(angular,yemd){
	"use strict";
	yemd.factory('checkLogin', ['$state','$rootScope', function($state,$rootScope){
    return function (query){
      if (query.status) {  
        return   ($state.current.name=== 'login')? $state.go('home'): { status:true, data:query.respond.data , menu:query.respond.menu  } ;              
      }else{
        return  ($state.current.name!== 'login')? $state.go('login'): { status: false, message:"Debe loguearse para acceder al sistema" };
      };
    };
  }]); 
})(angular,yemd);