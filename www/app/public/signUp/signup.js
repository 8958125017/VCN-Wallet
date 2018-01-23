mybccApp.controller('RegistraionCtrl', function($ionicLoading, $scope, $state, ionicMaterialInk,MyPayService, $ionicPopup, ConnectivityMonitor) {
ionicMaterialInk.displayEffect();
  $scope.user = {
    "email": "",
    "password": "",
    "confirmPassword": "",
    "spendingpassword": "",
    "confirmSpendingpassword": "",
  }

  $scope.createNewUser = function(user) {
     if (ConnectivityMonitor.isOffline()) {
      var alertPopup = $ionicPopup.alert({
        title: "Internet Disconnected",
        content: "internet is disconnected on your device."
      });
    } else {
      $scope.show($ionicLoading);
      MyPayService.createNewUser($scope.user).then(function(response) {
        if (response.data.statusCode == 200) {
          $scope.hide($ionicLoading);
          var alertPopup = $ionicPopup.alert({
            title: 'SignUp successfully',
          });
          $scope.user = {};
          $state.go('userlogin');
        } else {
          $scope.hide($ionicLoading);
          var alertPopup = $ionicPopup.alert({
            title: response.data.message,
          });
          $scope.user = {};
        }
      });
    }

  };




$scope.passwordMatch=function(password){
if($scope.user.confirmPassword!=password){
  $scope.noData = true;
}else{
   $scope.noData = false;
}
}


$scope.confirmspendingpasswordMatch=function(spengingPassword){
if($scope.user.confirmSpendingpassword!=spengingPassword){
  $scope.noData1 = true;
}else{
   $scope.noData1 = false;
}
}
  $scope.show = function() {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
  };

  $scope.hide = function() {
    $ionicLoading.hide();
  };
});
