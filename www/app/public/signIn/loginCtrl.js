mybccApp.controller('LoginCtrl', function($ionicLoading, $timeout, $scope, $rootScope, $state, ionicMaterialInk, ConnectivityMonitor, MyPayService, $localStorage, $ionicPopup, AuthService) {

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
  //  $scope.user = {
  //   "email": "pankajjoshi115@gmail.com",
  //   "password": "p@nk@j30SKH02"
  // }

   $scope.emailId = {
       "userMailId": ""
  }

  $scope.doLogin = function(user) {
    if (ConnectivityMonitor.isOffline()) {
      Materialize.toast("internet is disconnected on your device !!", 4000);
    } else {
      $rootScope = {};
      $localStorage.$reset();
      $scope.show($ionicLoading);
      MyPayService.loginUser($scope.user).then(function(response) { 
        if (response.data.statusCode == 200) {    
           $localStorage.credentials = response.data.user;          
           $rootScope.user = $localStorage.credentials; 
           $scope.emailId.userMailId=response.data.user.email;
             MyPayService.getBidCoin().then(function(response) {    
              if (response.statusCode == 200) {          
                   $rootScope.usdRate = response.currentBTCprice;          
                       } 
              });
             MyPayService.CurrntBalance($scope.emailId).then(function(response) {       
                if (response.data.statusCode == 200) {
                     $localStorage.cryptoBalance = response.data;
                     $rootScope.userBal = $localStorage.cryptoBalance;
                 }
             });
          $scope.hide($ionicLoading);
          $scope.user = { };
          $state.go('app.dashboard');
        } else  {
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

  $scope.signUp = function() {
    $scope.user = {
      "email": "",
      "password": ""
    }
    $state.go('signup');
  }

  $scope.forgotPassword = function() {
    $scope.user = {
      "email": "",
      "password": ""
    }
    $state.go('forgotPassword');
  }

});
