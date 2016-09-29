var accountController = function ($scope, $rootScope, $location, accountService) {

    if ($location.path() == '/sair'){
      accountService.logout();
    	return $location.path('/');
    }

    if (accountService.checkUser()){
      return $location.path('/dashboard');
    }
    
    $scope.login = function (email, password) {
    	accountService.login (email, password,
      function (logged) {
          console.log("go?");
		      $location.path('/dashboard');
    	},
      function (err) {
        $rootScope.messages.push({
          'content' : 'Usuário ou senha incorretos.',
          'class' : 'danger'
        });
      });
    }

    $scope.newUser = {};

    $scope.register = function () {

      if (!$scope.newUser.pass || !$scope.newUser.passRepeated || !$scope.newUser.name || !$scope.newUser.email) {
        return alert("Por favor, preencha todos os campos.");
      }

      if ($scope.newUser.pass != $scope.newUser.passRepeated) {
        return alert("É preciso repetir exatamente a mesma senha nos dois campos.")
      }

  		accountService.register($scope.newUser.name, $scope.newUser.email, $scope.newUser.pass, function () {

  			alert('Pronto! Agora você já pode usufruir das funcionalidades exclusivas.');

  			$location.path('/dashboard');

				$rootScope.messages.push({
				  'content' : 'Pronto! Agora você já pode usufruir das funcionalidades exclusivas.',
				  'class' : 'info'
				});

  			}, function (res) {
  				$rootScope.messages.push({
  				  'content' : 'Problema ao cadastrar usuário.',
  				  'class' : 'danger'
  				});
			});
    }
};