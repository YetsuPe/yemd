  $routes.$inject =['$stateProvider', '$urlRouterProvider','$locationProvider'];

  function $routes ($stateProvider, $urlRouterProvider, $locationProvider){ 
    $urlRouterProvider 
    .rule(function ($injector, $location) {
      var path = $location.path(),
          normalized = path.toLowerCase();
      if (path !== normalized) {
        return normalized;
      }
    })/*//incase sensitive  
    .otherwise('/')*/;

    $stateProvider
    .state('home',{
      url:'/',
      resolve: {
        login:['rest',function(rest){
          return rest('usuario/login','GET',{});
        }]
      },
      templateUrl: 'app/templates/login.html', 
      controller: ['$rootScope','$state','login','rest', 'checkLogin',function($rootScope,$state,login,rest, checkLogin){
        console.log("login state");
        $rootScope.yemd.appbar.title="Consama";
        $rootScope.yemd.appbar.type="normal";
        $rootScope.app.user= checkLogin( login ); //retrieve data from login
        var vm=this;  
        vm.login= function(){
          rest('usuario/login','POST',$rootScope.app.form.usuario).then(function(respond){ 
            //console.log(respond);
            if (respond.status) {
              $rootScope.app.form.usuario={}; //clean usuario form
              $rootScope.app.pristine=false; //clean usuario form 
              $state.go('home');
            }else{ 
              $rootScope.yemd.toggleSnackbar={ status:true, message: respond.message };
            };
          });
        };
      }],
      controllerAs:'vm'
    }) 
  }; 

angular.module('yemd').config($routes);