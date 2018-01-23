mybccApp.controller('ForgotPasswordCtrl', function($scope, $rootScope, $state,ionicMaterialInk, MyPayService, $ionicPopup, $ionicLoading,$localStorage, ConnectivityMonitor) {
  ionicMaterialInk.displayEffect();
  console.log("$rootScope.useremailIdtest ::: " + $rootScope.useremailIdtest);
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
  console.log("hello jgsdjfsd fjidshf ")
        if (strongRegularExp.test(value)) {
          $scope.checkpwdStrength["background-color"] = "green";
          $scope.passStrength="strong";
        } else if (mediumRegularExp.test(value)) {
          $scope.checkpwdStrength["background-color"] = "orange";
          $scope.passStrength="medium";
        } else {
          $scope.checkpwdStrength["background-color"] = "red";
           $scope.passStrength="week";
        }
      };

  $scope.hide = function() {
    $ionicLoading.hide();
  };
  $scope.useremailId = "";
  $scope.user = {
    "userMailId": ""
  }

  $scope.otpvalue = {
    "userMailId": "",
    "otp": ""
  }


  $scope.forgotPassword = function(user) {
    console.log("local+"+$localStorage.emailId);
    if ($scope.user.userMailId == "") {
      var alertPopup = $ionicPopup.alert({
        title: "Please enter email id",
      });
    } else if (ConnectivityMonitor.isOffline()) {
      Materialize.toast("internet is disconnected on your device !!",4000);   
    } else {
      $scope.show($ionicLoading);
      MyPayService.forgotPassword($scope.user).then(function(response) {
        if (response.data.statusCode == 200) {
          $scope.hide($ionicLoading);
          $scope.user = {};
          console.log("Setting mailid ::: " + response.data.userMailId)
          $localStorage.emailId=response.data.userMailId;
          $rootScope.useremailIdtest = $localStorage.emailId;
          var alertPopup = $ionicPopup.show({
            template: '<input type="password" placeholder="One Time Password" ng-model="otpvalue.otp" autofocus>',
            title: 'Enter One Time Password ',
            scope: $scope,
            buttons: [{
              text: 'Cancel',
              onTap: function(e) {
                return true;
              }
            }, {
              text: '<b>Submit</b>',
              type: 'button-positive',
              onTap: function(e) {
                if (ConnectivityMonitor.isOffline()) {
                  Materialize.toast("internet is disconnected on your device !!",4000);   
                } else {
                  $scope.show($ionicLoading);
                  MyPayService.VerifyEmail({
                    "userMailId": response.data.userMailId,
                    "otp": $scope.otpvalue.otp
                  }).then(function(response) {
                    if (response.data.statusCode == 200) {
                      $scope.hide($ionicLoading);
                      $scope.otpvalue = {
                        "userMailId": response.data.userMailId,
                        "otp": ""
                      }
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
            }, ]
          }).then(function(res) {
            console.log('Tapped!', res);
          }, function(err) {
            console.log('Err:', err);
          }, function(msg) {
            console.log('message:', msg);
          });

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
    "userMailId": $rootScope.useremailIdtest,
    "newPassword": "",
    "confirmNewPassword": ""
  }

  $scope.newPassword = function(newPasswordvalue) {
    console.log(" userMailId = =" + angular.toJson($scope.newPasswordvalue.userMailId))
    if ($scope.newPasswordvalue.newPassword == "") {
      var alertPopup = $ionicPopup.alert({
        title: "please enter new password",
      });
    } else if ($scope.newPasswordvalue.confirmNewPassword == "") {
      var alertPopup = $ionicPopup.alert({
        title: "password enter confirm new password ",
      });
    } else if (ConnectivityMonitor.isOffline()) {
      Materialize.toast("internet is disconnected on your device !!",4000);   
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
    $scope.passwordMatch=function(password){
if($scope.user.confirmPassword!=password){
  $scope.noData = true;
}else{
   $scope.noData = false;
}
}
  }


  $scope.passwordMatch=function(password){
if($scope.user.confirmPassword!=password){
  $scope.noData = true;
}else{
   $scope.noData = false;
}
}

  $scope.passwordMatch=function(password){
if($scope.newPasswordvalue.confirmNewPassword!=password){
  $scope.noData = true;
}else{
   $scope.noData = false;
}
}

 //$scope.init();
});
