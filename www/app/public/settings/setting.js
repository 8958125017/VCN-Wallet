mybccApp.controller('SettingCtrl', function($scope, $state, $ionicLoading, ConnectivityMonitor, $rootScope, $ionicPopup, $localStorage, MyPayService, getCurrentUserData,ionicMaterialInk) {
  $rootScope.user = $localStorage.credentials.user;
  $rootScope.userMail =getCurrentUserData.email;  
  $rootScope.verify = $rootScope.user.verifyEmail;  
  ionicMaterialInk.displayEffect();
  $scope.otpvalue = {
    "userMailId": "",
    "otp": ""
  }
  $scope.veryfyEmail = function(userMailId) {
    if (ConnectivityMonitor.isOffline()) {
      Materialize.toast("internet is disconnected on your device !!",4000);   
    } else {
      $scope.show($ionicLoading);
      $scope.emailId = {
        "userMailId": getCurrentUserData.email
      }
      MyPayService.EmailVerifyforAccount($scope.emailId).then(function(response) {
        if (response.data.statusCode == 200) {
          $scope.hide($ionicLoading);
          $rootScope.useremailId = response.data.userMailId;
          var alertPopup = $ionicPopup.show({
            template: '<input type="text" placeholder="One Time Password" ng-model="otpvalue.otp" autofocus>',
            title: 'Enter One Time Password ',
            scope: $scope,
            buttons: [{
              text: 'Cancel',
              onTap: function(e) {
                $scope.otpvalue = {
                  "otp": ""
                };
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
                  MyPayService.VerificationEmail({"userMailId": $localStorage.credentials.user.email,"otp": $scope.otpvalue.otp}).then(function(response) {
                    if (response.data.statusCode == 200) {
                      console.log("response = = = "+angular.toJson(response));
                      $rootScope.user = $localStorage.credentials.user;
                      $rootScope.userMail =getCurrentUserData.email;  
                      $rootScope.verify = $rootScope.user.verifyEmail;  
                      $scope.user.verifyEmail=true;
                      $scope.hide($ionicLoading);
                      $scope.otpvalue = {
                        "otp": ""
                      };
                      Materialize.toast("Email verified successfully !!",4000);
                      $state.go('app.setting');
                    } else {
                      $scope.hide($ionicLoading);
                      var alertPopup = $ionicPopup.alert({
                        title: response.data.message,
                      });
                      $scope.otpvalue = {
                        "otp": ""
                      };
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

  // update current password

  $scope.passwordValue = {
    "userMailId": getCurrentUserData.email,
    "currentPassword": "",
    "newPassword": "",
    "confirmNewPassword": ""
  };

  $scope.changeCurrentPassword = function() {
    if (ConnectivityMonitor.isOffline()) {
      Materialize.toast("internet is disconnected on your device !!",4000);   
    } else {
      var alertPopup = $ionicPopup.show({
        template: '<input type="password" placeholder="current password" ng-model="passwordValue.currentPassword" autofocus> <br><input type="password" placeholder="new password" ng-model="passwordValue.newPassword" autofocus><br><input type="password" placeholder="confirm new password" ng-model="passwordValue.confirmNewPassword" autofocus>',
        title: 'Change Password ',
        scope: $scope,
        buttons: [{
          text: 'Cancel',
          onTap: function(e) {
            $scope.passwordValue = {};
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
              MyPayService.changepasswords($scope.passwordValue).then(function(response) {
                if (response.data.statusCode == 200) {
                  $scope.hide($ionicLoading);
                  var alertPopup = $ionicPopup.alert({
                    title: 'password change successfully',
                  });
                  $scope.passwordValue = {};
                  $state.go('app.dashboard');
                } else {
                  $scope.hide($ionicLoading);
                  var alertPopup = $ionicPopup.alert({
                    title: response.data.message,
                  });
                  $scope.passwordValue = {};
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
    }
  }


  $scope.currentpasswordValue = {
    "userMailId": getCurrentUserData.email,
    "currentPassword": "",
  };
  $scope.otpvalues = {
    "userMailId": "",
    "otp": ""
  }
  $scope.changeSpendingtPassword = function() {
    if (ConnectivityMonitor.isOffline()) {
     Materialize.toast("internet is disconnected on your device !!",4000);   
    } else {
      var alertPopup = $ionicPopup.show({
        template: '<input type="password" placeholder="current password" ng-model="currentpasswordValue.currentPassword" autofocus>',
        title: 'Current Password ',
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
            $scope.show($ionicLoading);
            MyPayService.OtpToUpdateSpendingPassword($scope.currentpasswordValue).then(function(response) {
              if (response.data.statusCode == 200) {
                $scope.hide($ionicLoading);
                $rootScope.useremailId = response.data.userMailId;
                var alertPopup = $ionicPopup.show({
                  template: '<input type="password" placeholder="One Time Password" ng-model="otpvalues.otp" autofocus>',
                  title: 'Enter One Time Password ',
                  scope: $scope,
                  buttons: [{
                    text: 'Cancel',
                    onTap: function(e) {
                      $scope.otpvalue = {
                        "otp": ""
                      };
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
                        MyPayService.OtpToEmailForgotSpendingPassord({
                          "userMailId": $localStorage.credentials.user.email,
                          "otp": $scope.otpvalues.otp
                        }).then(function(response) {
                          if (response.data.statusCode == 200) {
                            $scope.hide($ionicLoading);
                            $state.go('app.changeSpendingPassword');
                          } else {
                            $scope.hide($ionicLoading);
                            var alertPopup = $ionicPopup.alert({
                              title: response.data.message,
                            });
                            $scope.otpvalue = {
                              "otp": ""
                            };
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
        }, ]
      }).then(function(res) {
        console.log('Tapped!', res);
      }, function(err) {
        console.log('Err:', err);
      }, function(msg) {
        console.log('message:', msg);
      });
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

  var vm = this;
  vm.pinlock = 'Off';
  $scope.showConfirm = function(val) {
    if (val === 'On') {
      // $state.go('pinlock');

    } else {

      // On Cancel Update Value
      vm.pinlock = 'Off';
      return vm.pinlock;
    }
  };
});
