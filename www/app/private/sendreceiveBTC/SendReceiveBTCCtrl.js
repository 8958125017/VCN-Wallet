mybccApp.controller('SendReceiveBTCCtrl', function($scope, $state, $rootScope, $ionicLoading, ionicMaterialInk, $cordovaBarcodeScanner, ConnectivityMonitor, $ionicPlatform, MyPayService, $localStorage, $ionicPopup, $ionicActionSheet, $timeout, $cordovaClipboard, getCurrentUserData) {
  ionicMaterialInk.displayEffect();
  $scope.emailId = {
       "userMailId": ""
  }

  $rootScope.user = $localStorage.credentials;
  $scope.emailId.userMailId=$rootScope.user.email;   

    MyPayService.CurrntBalance($scope.emailId).then(function(response) {       
        if (response.data.statusCode == 200) {
           $localStorage.cryptoBalance = response.data;
            $rootScope.userBal = $localStorage.cryptoBalance;
        }
      });    
  $scope.show = function()

  {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
  };

  $scope.hide = function() {
    $ionicLoading.hide();
  };
  $scope.values = {
    "currency":"",
    "userMailId": "",
    "amount": "",
    "spendingPassword": "",
    "recieverCoinAddress": "",   
  }

  $scope.data = {
    "address": "",
    "amount": ""
  }

  $scope.sendBTCCoinByUser = function() {
    if ($scope.values.recieverCoinAddress == "") {
      var alertPopup = $ionicPopup.alert({
        title: "please enter address",
      });
    } else if ($scope.values.amount == "") {
      var alertPopup = $ionicPopup.alert({
        title: "please enter amount",
      });
    } else {
      var alertPopup = $ionicPopup.show({
        template: '<input type="number" placeholder="pin" ng-model="values.spendingPassword" autofocus>',
        title: 'Enter PIN ',
        scope: $scope,
        buttons: [{
            text: 'Cancel',
            onTap: function(e) {
              $scope.values = {
                "userMailId": getCurrentUserData.email,
                "amount": "",
                "spendingPassword": "",
                "recieverCoinAddress": ""          
              }
              return true;
            }
          },
          {
            text: '<b>Submit</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (ConnectivityMonitor.isOffline()) {
                Materialize.toast("internet is disconnected on your device !!", 4000);
              } else {
                $scope.show($ionicLoading);        
                $scope.values.currency="BTC";       
                $scope.values.userMailId=getCurrentUserData.email;
                 console.log("$scope.values = = "+angular.toJson($scope.values));
                MyPayService.sendCoinByUser($scope.values).then(function(response) {
                  console.log("response = = " + angular.toJson(response));
                  if (response.data.statusCode == 200) {
                        MyPayService.CurrntBalance($scope.emailId).then(function(response) {       
                      if (response.data.statusCode == 200) {
                         $localStorage.cryptoBalance = response.data;
                         $rootScope.userBal = $localStorage.cryptoBalance;
                         }
                       });     
                    $scope.hide($ionicLoading);
                    Materialize.toast('Transaction Successfully !!', 4000);
                    $scope.values = {
                      "userMailId": getCurrentUserData.email,
                      "amount": "",
                      "spendingPassword": "",
                      "recieverCoinAddress": ""
                     };
                    $state.go('app.dashboard');
                  } else {
                    $scope.hide($ionicLoading);
                    var alertPopup = $ionicPopup.alert({
                      title: response.data.message,
                    });
                    $scope.values = {
                      "userMailId": getCurrentUserData.email,
                      "amount": "",
                      "spendingPassword": "",
                      "recieverCoinAddress": ""
                    }
                  }
                });
              }

            }
          },
        ]
      }).then(function(res) {
        console.log('Tapped!', res);
      }, function(err) {
        console.log('Err:', err);
      }, function(msg) {
        console.log('message:', msg);
      });
    }
  }



  $scope.scanBarCode = function() {

    $cordovaBarcodeScanner.scan().then(function(imageData) {
      $scope.getImageData = imageData.text;

      if ($scope.getImageData.indexOf(",") > 0) {
        var codeArray = $scope.getImageData.split(',');
        var myEl = angular.element(document.querySelector('#focusBtcAddress'));
        myEl.attr('style', 'transform: translateY(-14px);');
        var myE2 = angular.element(document.querySelector('#focusBtcAmount'));
        myE2.attr('style', 'transform: translateY(-14px);');

        $scope.values.recieverCoinAddress = codeArray[0].replace(/bitcoin:|bitcoin=|btc:|btc=|btcaddress:|btcaddress=|btcaddress:|btcaddress=/g, "").trim();

        $scope.values.amount = codeArray[1].replace(/amount:|amount=/g, "").trim();
      } else if ($scope.getImageData.indexOf(":") > 0 || $scope.getImageData.indexOf("=") > 0) {
        console.log($scope.getImageData.indexOf("="));
        var codeArray = $scope.getImageData;
        var myEl = angular.element(document.querySelector('#focusBtcAddress'));
        myEl.attr('style', 'transform: translateY(-14px);');

        $scope.values.recieverCoinAddress = codeArray.replace(/bitcoin:|bitcoin=|btc:|btc=|btcaddress:|btcaddress=|btcaddress:|btcaddress=/g, "").trim();

      } else {
        $scope.values.recieverCoinAddress = $scope.getImageData;
        var myEl = angular.element(document.querySelector('#focusBtcAddress'));
        myEl.attr('style', 'transform: translateY(-14px);');

      }


    }, function(error) {
      $scope.scanResults = 'Error: ' + error;
      console.log("An error happened -> " + error);
    });
  }
  $scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'My BTC Addresss',
      scope: $scope,
      template: '<div class="center" style="margin-left: 74px;"> <qrcode text="{{ user.BTCAddress}}" ng-click="copyAddress(user.BTCAddress)"></qrcode></div><div class="center">{{ user.BTCAddress}}<div>'
    });

    confirmPopup.then(function(res) {
      if (res) {
        $scope.shareAddress($scope.user.BTCAddress);
        console.log('You are sure');
      } else {
        console.log('You are not sure');
      }
    });
  };


  $scope.shareAddress = function(address) {
    var hideSheet = $ionicActionSheet.show({
      buttons: [{
          text: 'whatsapp'
        },
        // {
        //   text: 'facebook'
        // },
        {
          text: 'message'
        }
      ],
      titleText: 'Share address Via',
      cssClass: 'social-actionsheet',
      cancelText: 'Cancel',
      cancel: function() {
        // add cancel code..
      },
      buttonClicked: function(index) {
        if (index === 0) {
          window.plugins.socialsharing.shareViaWhatsApp(address, null /* img */ , null /* url */ , null, function(errormsg) {
            alert("Error: Cannot Share")
          });
        }
        // if (index === 1) {
        //   window.plugins.socialsharing.shareViaFacebook(address, null /* img */ , null /* url */ , null, function(errormsg) {
        //     alert("Error: Cannot Share")
        //   });
        // }
        if (index === 1) {
          window.plugins.socialsharing.shareViaSMS(address, null /* img */ , null /* url */ , null, function(errormsg) {
            alert("Error: Cannot Share")
          });
        }

      }
    });

    // For example's sake, hide the sheet after two seconds
    $timeout(function() {
      hideSheet();
    }, 5000);

  }
  $scope.copyAddress = function(address) {
    $cordovaClipboard.copy(address).then(function() {
      console.log("Copied text");
      Materialize.toast('Text Copied !!', 4000);
    }, function() {
      console.error("There was an error copying");
    });
  }

})
