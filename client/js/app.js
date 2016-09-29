var app = angular.module('PayFood', ['ngRoute', 'ngCookies']);

app.config(function ($routeProvider, $locationProvider) {

		// $locationProvider.html5Mode(true);

	    $routeProvider
	        .when('/', { 
	    		controller: 'homeController',
	    		templateUrl: 'templates/home.html'
	    	})
	        .when('/entrar', { 
	            controller: 'accountController',
	            templateUrl: 'templates/login.html'
	        })
	        .when('/sair', {
	        	controller: 'accountController',
	            templateUrl: 'templates/logout.html'
	        })
	        .when('/registrar', {
	        	controller: 'accountController',
	            templateUrl: 'templates/register.html'
	        })
	        .when('/dashboard', {
	        	controller: 'dashboardController',
	            templateUrl: 'templates/dashboard.html'
	        })
	        .when('/dashboard/estabelecimento', {
	        	controller: 'estabelecimentoController',
	            templateUrl: 'templates/edicao_estabelecimento.html'
	        })
	        .otherwise(
	        	{ redirectTo:'/' }
	    	);
	}
);

app.controller('homeController', ['$scope', '$rootScope', homeController]);
app.controller('accountController', ['$scope', '$rootScope', '$location', 'accountService', accountController]);
app.controller('dashboardController', ['$scope', '$rootScope', '$location', 'backendService', 'accountService', dashboardController]);
app.controller('estabelecimentoController', ['$scope', '$rootScope', '$location', 'backendService', 'accountService', estabelecimentoController]);

app.service('accountService', accountService);
app.service('backendService', backendService);

app.run(['$rootScope', '$location', 'accountService',
    function ($rootScope, $location, accountService) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {

            $rootScope.messages = [];

            if ($location.path() == '/') {
            	$rootScope.home_page = true;
            } else {
            	$rootScope.home_page = false;
            }

            if (/\/dashboard/.test($location.path()) && !accountService.checkUser()){
                event.preventDefault();
                $location.path('/login');
            }
        });
    }
]);

app.filter('capitalize', function() {
  return function(token) {
  	  if (token) {
      	 return token.charAt(0).toUpperCase() + token.slice(1);
      } else {
      	return "";
      }
   }
});