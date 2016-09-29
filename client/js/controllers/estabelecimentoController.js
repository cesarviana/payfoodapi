var estabelecimentoController = function($scope, $rootScope, $location, backendService, accountService) {

	
	// if (!$rootScope.user.estabelecimento) {
		backendService.get('estabelecimento/usuario', $rootScope.user._id).then(function (response) {
			var estabelecimento = response.data;
			if (estabelecimento) {
				$rootScope.user.estabelecimento = estabelecimento;
				accountService.storeUser($rootScope.user);
			}
		}, function (err){});
	// }

	$scope.delete = function () {
		backendService.remove('estabelecimento', $rootScope.user.estabelecimento._id).then(function() {
			$rootScope.user.estabelecimento = undefined;
			accountService.storeUser($rootScope.user);
			$rootScope.messages.push({
        		'content' : 'O estabelecimento foi excluído.',
        		'class' : 'info'
      		});
		})
	}

	$scope.save = function() {

		$rootScope.user.estabelecimento.stars = 0;
		$rootScope.user.estabelecimento.usuario_id = $rootScope.user._id;
		$rootScope.user.estabelecimento.location.x = Number($rootScope.user.estabelecimento.location.x);
		$rootScope.user.estabelecimento.location.y = Number($rootScope.user.estabelecimento.location.y);

		function onSuccess(response) {
			if (response._id) {
				$rootScope.user.estabelecimento = response.data;
				accountService.storeUser($rootScope.user);
			}
			$location.path('/dashboard');
			$rootScope.messages.push({
        		'content' : 'O estabelecimento foi salvo com sucesso.',
        		'class' : 'info'
      		});
		}

		function onError(err) {
			$rootScope.messages.push({
        		'content' : 'Ocorreu um erro ao tentar salvar o estabelecimento.',
        		'class' : 'danger'
      		});
		}

		if ($rootScope.user.estabelecimento._id)
			backendService.update('estabelecimento', $rootScope.user.estabelecimento ).then(onSuccess, onError);		
		else
			backendService.insert('estabelecimento', $rootScope.user.estabelecimento ).then(onSuccess, onError);		
	};

};
