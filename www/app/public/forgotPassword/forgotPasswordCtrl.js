mybccApp.controller('ForgotPasswordCtrl', function($scope, $rootScope, $state, ionicMaterialInk, MyPayService, $ionicPopup, $ionicLoading, $localStorage, ConnectivityMonitor) {
  ionicMaterialInk.displayEffect();

  $scope.show = function() {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
  };

  var strongRegularExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  var mediumRegularExp = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{5,})");

  $scope.checkpwdStrength = {
    "width": "150px",
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

  $scope.hide = function() {
    $ionicLoading.hide();
  };
  $scope.useremailId = "";
  $scope.user = {
    "userMailId": ""
  }

 

  $scope.forgotPassword = function(user) {
    if (ConnectivityMonitor.isOffline()) {
      Materialize.toast("internet is disconnected on your device !!", 4000);
    } else {
      $scope.show($ionicLoading);
      MyPayService.forgotPassword($scope.user).then(function(response) {
        if (response.data.statusCode == 200) {
          $scope.hide($ionicLoading);
          $scope.user = {};
           $state.go('changePassword');
        } else {
          $scope.hide($ionicLoading);
          var alertPopup = $ionicPopup.alert({
            title: response.data.message,
          });
        }
      });
    }
  }


  $scope.newPasswordvalue = {
    "otp": "",
    "newPassword": "",
    "confirmNewPassword": ""
  }


  $scope.newPassword = function(newPasswordvalue) {   
    if ($scope.newPasswordvalue.newPassword == "") {
      var alertPopup = $ionicPopup.alert({
        title: "please enter new password",
      });
    } else if ($scope.newPasswordvalue.confirmNewPassword == "") {
      var alertPopup = $ionicPopup.alert({
        title: "password enter confirm new password ",
      });
    } else if (ConnectivityMonitor.isOffline()) {
      Materialize.toast("internet is disconnected on your device !!", 4000);
    } else {
      $scope.show($ionicLoading);
      MyPayService.updateForgotPassord($scope.newPasswordvalue).then(function(response) {
        if (response.data.statusCode == 200) {
          $scope.hide($ionicLoading);
          var alertPopup = $ionicPopup.alert({
            title: "password update successfully",
          });
          $scope.newPasswordvalue = {
            "userMailId": $rootScope.useremailIdtest,
            "newPassword": "",
            "confirmNewPassword": ""
          };
          $localStorage.$reset();
          $state.go('userlogin');
        } else {
          $scope.hide($ionicLoading);
          var alertPopup = $ionicPopup.alert({
            title: response.data.message,
          });
          $scope.newPasswordvalue = {
            "newPassword": "",
            "confirmNewPassword": ""
          };
        }
      });
    }
    $scope.passwordMatch = function(password) {
      if ($scope.user.confirmPassword != password) {
        $scope.noData = true;
      } else {
        $scope.noData = false;
      }
    }
  }


  $scope.passwordMatch = function(password) {
    if ($scope.user.confirmPassword != password) {
      $scope.noData = true;
    } else {
      $scope.noData = false;
    }
  }

  $scope.passwordMatch = function(password) {
    if ($scope.newPasswordvalue.confirmNewPassword != password) {
      $scope.noData = true;
    } else {
      $scope.noData = false;
    }
  }

  $scope.login = function() {
    $scope.user = {
      "userMailId": ""
    }
    $state.go('userlogin');
  }

  $scope.signUp = function() {
    $scope.user = {
      "userMailId": ""
    }
    $state.go('signup');
  }
});
