var dashboardController = function($scope, $rootScope, $location, backendService, accountService) {
	
	if (!$rootScope.user.estabelecimento) {
		backendService.get('estabelecimento/usuario', $rootScope.user._id).then(function (response) {
			var estabelecimento = response.data;
			if (estabelecimento)
				withBusiness(estabelecimento);
			else
				withoutBusiness();
		}, withoutBusiness);
	} 
	else {
		$scope.testeiEstabelecimento = true;
	}

	function withBusiness(b) {
		$rootScope.user.estabelecimento = b;
		accountService.storeUser($rootScope.user);
		$scope.testeiEstabelecimento = true;
	}

	function withoutBusiness(err) {
		$scope.testeiEstabelecimento = true;
		$location.path('/dashboard/estabelecimento');
	}

};
