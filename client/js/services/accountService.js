var accountService = function($http, $q, $rootScope, $cookies, backendService) {

	this.login = function(account, password, ok_callback, error_callback) {
		if (!this.checkUser()){
			backendService.query('login', { email: account, password: password }).then(function (response) {
				var user = response.data;
				if (user.email) {
					$rootScope.user = user;
					$cookies.put('user', JSON.stringify(user));
					return ok_callback();
				}
			}, error_callback);
		}
		else
			return ok_callback();
	}

	this.register = function(name, email, pass, ok_callback, error_callback) {

		var user = { name: name, email: email, password: pass };

		backendService.insert('usuario', user ).then(function (response) {
			$rootScope.user = response.data;
			$cookies.put('user', JSON.stringify(user));
			return ok_callback();
		}, error_callback);
	}

	this.logout = function (){
		$rootScope.user = undefined;
		$cookies.remove('user');
	}

	this.storeUser = function(user) {
		$cookies.put('user', JSON.stringify(user));
	}

	this.checkUser = function() {

		if ($rootScope.user)
			return true;

		var cooked_user = $cookies.get('user');
	
		if (cooked_user) {
			cooked_user = JSON.parse(cooked_user);
			$rootScope.user = cooked_user;
			this.storeUser($rootScope.user);
			return true;
		} else {
			return false;
		}
	}
};