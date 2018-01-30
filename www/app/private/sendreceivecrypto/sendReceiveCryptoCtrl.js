mybccApp.controller('SendReceiveCryptoCtrl', function($scope,$rootScope, $state, MyPayService, $ionicLoading, ionicMaterialInk, ConnectivityMonitor, $cordovaBarcodeScanner, $ionicPlatform, $localStorage, $ionicPopup, $ionicActionSheet, $timeout, $cordovaClipboard, getCurrentUserData) {
  ionicMaterialInk.displayEffect();
 $scope.emailId = {
       "userMailId": ""
  }

  $rootScope.user = $localStorage.credentials;
  $scope.userBCHAddress = $localStorage.credentials;
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
    "currency":"VCN",
    "userMailId": getCurrentUserData.email,
    "amount": "",
    "spendingPassword": "",
    "recieverCoinAddress": ""
  }

  $scope.data = {
    "address": "",
    "amount": ""
  }

  
  
  $scope.sendCryptoByUser = function() {
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
        title: 'Enter PIN',
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
        }, {
          text: '<b>Submit</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (ConnectivityMonitor.isOffline()) {
              Materialize.toast("internet is disconnected on your device !!", 4000);
            } else {
              $scope.show($ionicLoading);
              $scope.values.userMailId=getCurrentUserData.email;
              console.log("$scope.values = = "+angular.toJson($scope.values));
              MyPayService.sendCoinByUser($scope.values).then(function(response) {
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
                  }
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

  $scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'My VCN Addresss',
      scope: $scope,
      template: '<div class="center" style="margin-left: 74px;"> <qrcode text="{{ user.VCNAddress}}" ng-click="copyAddress(user.VCNAddress)"></qrcode></div><div class="center">{{ user.VCNAddress}}<div>'
     
    });

    confirmPopup.then(function(res) {
      if (res) {
        $scope.shareAddress($scope.user.VCNAddress);
        console.log('You are sure');
      } else {
        console.log('You are not sure');
      }
    });
  };


  $scope.shareAddress = function(address) {
    console.log("text shareAddress" + address);
    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      buttons: [{
          text: 'whatsapp'
        },
        {
          text: 'facebook'
        },
        {
          text: 'message'
        }
      ],

      titleText: 'Share Address Via',
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
        if (index === 1) {
          window.plugins.socialsharing.shareViaFacebook(address, null /* img */ , null /* url */ , null, function(errormsg) {
            alert("Error: Cannot Share")
          });
        }
        if (index === 2) {
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

  $scope.scanBarCode = function() {
    $cordovaBarcodeScanner.scan().then(function(imageData) {
      $scope.getImageData = imageData.text;
      if ($scope.getImageData.indexOf(",") > 0) {
        var codeArray = $scope.getImageData.split(',');
        var myEl = angular.element(document.querySelector('#focusBchAddress'));
        myEl.attr('style', 'transform: translateY(-14px);');
        var myE2 = angular.element(document.querySelector('#focusBchAmount'));
        myE2.attr('style', 'transform: translateY(-14px);');

        $scope.address = codeArray[1].replace(/bitcoincash:|bitcoincash=|bch:|bch=|bcc:|bcc=|bchaddress:|bchaddress=|bccaddress:|bccaddress=/g, "").trim();


        var trim1 = $scope.address.split(':');
        console.log("trim1 " + trim1);
        $scope.values.amount = trim1[1];
        console.log("$scope.values.amount " + $scope.values.amount);
        $scope.amountSend = codeArray[0].replace(" amount: ", " ").trim();
        console.log("$scope.amountSend " + $scope.amountSend);
        var trim2 = $scope.amountSend.split(':');
        console.log("trim2 " + trim2);

        $scope.values.recieverBCHCoinAddress = trim2[1];
      } else if ($scope.getImageData.indexOf(":") > 0) {
        var codeArray = $scope.getImageData;
        var myEl = angular.element(document.querySelector('#focusBchAddress'));
        myEl.attr('style', 'transform: translateY(-14px);');

        $scope.address = codeArray.replace(/bitcoincash:|bitcoincash=|bch:|bch=|bcc:|bcc=|bchaddress:|bchaddress=|bccaddress:|bccaddress=/g, "").trim();
        var trim1 = $scope.address.split(':');
        $scope.values.recieverBCHCoinAddress = trim1[1];
      } else {
        $scope.values.recieverBCHCoinAddress = $scope.getImageData;
        var myEl = angular.element(document.querySelector('#focusBchAddress'));
        myEl.attr('style', 'transform: translateY(-14px);');

      }



    }, function(error) {
      $scope.scanResults = 'Error: ' + error;
      console.log("An error happened -> " + error);
    });
  }
});
