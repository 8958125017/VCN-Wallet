angular.module('blocIoAppFront.authService', [])
  .factory('AuthService', function($http, $localStorage, $state) {
    function AuthService() {}
    AuthService.logout = function() {
      $localStorage.$reset();
      $state.go('signin');
    }

    AuthService.isAuthenticated = function() {
      return Boolean($localStorage.credentials);
    }
    return AuthService;
  });
