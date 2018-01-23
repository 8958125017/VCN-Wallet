mybccApp.controller('SendReceiveBTCCtrl', function($scope, $state,$rootScope, $ionicLoading, ionicMaterialInk,$cordovaBarcodeScanner, ConnectivityMonitor, $ionicPlatform, MyPayService, $localStorage, $ionicPopup, $ionicActionSheet, $timeout, $cordovaClipboard ,getCurrentUserData) {
ionicMaterialInk.displayEffect();
 $rootScope.user=$localStorage.credentials.user;
  $scope.show = function()

  {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
  };

  $scope.init = function() {
    $scope.values="";
  }

  $scope.hide = function() {
    $ionicLoading.hide();
  };
  $scope.values = {
    "userMailId": getCurrentUserData.email,
    "amount": "",
    "spendingPassword": "",
    "recieverBTCCoinAddress": "",
    "commentForReciever": "Comment for Reciever",
    "commentForSender": "Comment for sender"
  }

  $scope.data = {
    "address": "",
    "amount": ""
  }

  $scope.sendBTCCoinByUser = function() {
      if ($scope.values.recieverBTCCoinAddress == "") {
      var alertPopup = $ionicPopup.alert({
        title: "please enter address",
      });
    } else if ($scope.values.amount == "") {
      var alertPopup = $ionicPopup.alert({
        title: "please enter amount",
      });
    } else {
      var alertPopup = $ionicPopup.show({
        template: '<input type="password" placeholder="spendingPassword" ng-model="values.spendingPassword" autofocus>',
        title: 'Enter Spending Password ',
        scope: $scope,
        buttons: [{
            text: 'Cancel',
            onTap: function(e) {
              $scope.values = {
                "userMailId": getCurrentUserData.email,
                "amount": "",
                "spendingPassword": "",
                "recieverBTCCoinAddress": "",
                "commentForReciever": "Comment for Reciever",
                "commentForSender": "Comment for sender"
              }
              return true;
            }
          },
          {
            text: '<b>Submit</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (ConnectivityMonitor.isOffline()) {
                Materialize.toast("internet is disconnected on your device !!",4000);   
              } else {
                $scope.show($ionicLoading);
                MyPayService.sendBTCCoinByUser($scope.values).then(function(response) {
                  if (response.data.statusCode == 200) {
                    $localStorage.credentials.user = response.data.user;
                    $rootScope.user = $localStorage.credentials.user;                 
                    $scope.hide($ionicLoading);
                    Materialize.toast('Transaction Successfully !!', 4000);
                    $scope.values = {
                      "userMailId": getCurrentUserData.email,
                      "amount": "",
                      "spendingPassword": "",
                      "recieverBTCCoinAddress": "",
                      "commentForReciever": "Comment for Reciever",
                      "commentForSender": "Comment for sender"
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
                      "recieverBTCCoinAddress": "",
                      "commentForReciever": "Comment for Reciever",
                      "commentForSender": "Comment for sender"
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


  $scope.userBTCAddress = $localStorage.credentials.user;

 $scope.scanBarCode = function() {  
      

    $cordovaBarcodeScanner.scan().then(function(imageData) {
      $scope.getImageData = imageData.text;

      if($scope.getImageData.indexOf(",") > 0){
          var codeArray = $scope.getImageData.split(',');
          var myEl = angular.element(document.querySelector('#focusBtcAddress'));
          myEl.attr('style', 'transform: translateY(-14px);');
          var myE2 = angular.element(document.querySelector('#focusBtcAmount'));
          myE2.attr('style', 'transform: translateY(-14px);');

          $scope.values.recieverBTCCoinAddress  = codeArray[0].replace(/bitcoin:|bitcoin=|btc:|btc=|btcaddress:|btcaddress=|btcaddress:|btcaddress=/g, "").trim();
         
          $scope.values.amount = codeArray[1].replace(/amount:|amount=/g, "").trim();
      }
      else if($scope.getImageData.indexOf(":") > 0 || $scope.getImageData.indexOf("=") > 0){
          console.log($scope.getImageData.indexOf("="));
         var codeArray = $scope.getImageData;
          var myEl = angular.element(document.querySelector('#focusBtcAddress'));
          myEl.attr('style', 'transform: translateY(-14px);');

          $scope.values.recieverBTCCoinAddress = codeArray.replace(/bitcoin:|bitcoin=|btc:|btc=|btcaddress:|btcaddress=|btcaddress:|btcaddress=/g, "").trim();
         
      }
       else{
          $scope.values.recieverBTCCoinAddress = $scope.getImageData;
          var myEl = angular.element(document.querySelector('#focusBtcAddress'));
          myEl.attr('style', 'transform: translateY(-14px);');

      }
      
      
    }, function(error) {
      $scope.scanResults = 'Error: ' + error;
      console.log("An error happened -> " + error);
    });
  }
   $scope.init();
   
  $scope.showConfirm = function() {
      var confirmPopup = $ionicPopup.confirm({
        title: 'My BTC Addresss',
        scope: $scope,
        template: '<div class="center" style="margin-left: 74px;"> <qrcode text="{{ user.userBTCAddress}}" ng-click="copyAddress(user.userBTCAddress)"></qrcode></div><div class="center">{{ user.userBTCAddress}}<div>'
      });

      confirmPopup.then(function(res) {
        if (res) {
          $scope.shareAddress($scope.user.userBCHAddress);
          console.log('You are sure');
        } else {
          console.log('You are not sure');
        }
      });
    };
    $scope.copyAddress = function(address) {
      $cordovaClipboard.copy(address).then(function() {
        console.log("Copied text");
        Materialize.toast('Text Copied !!', 4000);
      }, function() {
        console.error("There was an error copying");
      });
    }

})
