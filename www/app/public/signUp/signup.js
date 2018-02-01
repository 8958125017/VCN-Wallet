mybccApp.controller('RegistraionCtrl', function($ionicLoading, $scope, $state, ionicMaterialInk, MyPayService, $ionicPopup, ConnectivityMonitor) {
  ionicMaterialInk.displayEffect();
  $scope.user = {
    "name": "",
    "email": "",
    "password": "",
    "confirmPassword": "",
    "spendingpassword": "",
    "confirmSpendingpassword": ""
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
            title: 'SignUp Successfull Please verify your account first',
          });
          $scope.user = {};
          $state.go('userlogin');
        } else {
          $scope.hide($ionicLoading);
          var alertPopup = $ionicPopup.alert({
            title: response.data.message,
          });
           $state.go('userlogin');
          // $scope.user = {
          //   "name": "",
          //   "email": "",
          //   "password": "",
          //   "confirmPassword": "",
          //   "spendingpassword": "",
          //   "confirmSpendingpassword": "",
          // }
        }
      });
    }

  };

  var strongRegularExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  var mediumRegularExp = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{5,})");
  $scope.checkpwdStrength = {
    "width": "100px",
    "height": "17px",
    "float": "left"
  };

  $scope.validationInputPwdText = function(value) {
    if (strongRegularExp.test(value)) {
      $scope.checkpwdStrength["background-color"] = "green";
      $scope.passStrength = "strong";
    } else if (mediumRegularExp.test(value)) {
      $scope.checkpwdStrength["background-color"] = "orange";
      $scope.passStrength = "medium";
    } else {
      $scope.checkpwdStrength["background-color"] = "red";
      $scope.passStrength = "week";
    }
  };

  $scope.checkspendingPWDStrength = {
    "width": "150px",
    "height": "17px",
    "float": "left"
  };

  $scope.validationSpendingPwdText = function(value) {
    if (strongRegularExp.test(value)) {
      $scope.checkspendingPWDStrength["background-color"] = "green";
      $scope.SpendingStrength = "strong";
    } else if (mediumRegularExp.test(value)) {
      $scope.checkspendingPWDStrength["background-color"] = "orange";
      $scope.SpendingStrength = "medium";
    } else {
      $scope.checkspendingPWDStrength["background-color"] = "red";
      $scope.SpendingStrength = "week";
    }
  };

  $scope.passwordMatch = function(password) {
    if ($scope.user.confirmPassword != password) {
      $scope.noData = true;
    } else {
      $scope.noData = false;
    }
  }

     $scope.confirmspendingpasswordMatch = function(password) {
     if ($scope.user.confirmSpendingpassword != password) {
       $scope.noData1 = true;
     } else {
       $scope.noData1= false;
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

  $scope.login = function() {
    $scope.user = {
      "name": "",
      "email": "",
      "password": "",
      "confirmPassword": "",
      "spendingpassword": "",
      "confirmSpendingpassword": "",
    }
    $state.go('userlogin');
  }
});
