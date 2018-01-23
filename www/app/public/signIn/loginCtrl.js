mybccApp.controller('LoginCtrl', function($ionicLoading, $timeout, $scope, $rootScope, $state,ionicMaterialInk, ConnectivityMonitor, MyPayService, $localStorage, $ionicPopup, AuthService) {
ionicMaterialInk.displayEffect();
  $scope.show = function() {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
  };

  $scope.hide = function() {
    $ionicLoading.hide();
  };

  if (AuthService.isAuthenticated()) {
    $state.go('app.dashboard', {}, {
      reload: true
    });
  }

  $scope.user = {
    "email": "",
    "password": ""
  }

  $scope.doLogin = function(user) {
    if (ConnectivityMonitor.isOffline()) {
      Materialize.toast("internet is disconnected on your device !!",4000);   
    } else {
      $scope.show($ionicLoading);
      MyPayService.loginUser($scope.user).then(function(response) {
        if (response.data.statusCode == 200) {
          $localStorage.credentials = response.data;
          $rootScope.user = $localStorage.credentials.user;
          $rootScope.userProfileDetails = $localStorage.credentials.user.email;
          $rootScope.$broadcast("user", response.data);
          $scope.hide($ionicLoading);
          $scope.user = {
            "email": "",
            "password": ""
          }
          $state.go('app.dashboard');
        } else if (response.data.statusCode >= 400) {
          $scope.hide($ionicLoading);
          var alertPopup = $ionicPopup.alert({
            title: response.data.message,
          });
        }
      });
    }
  };

  $scope.goToRegister = function() {
    $state.go('userregistration');
  }

});
