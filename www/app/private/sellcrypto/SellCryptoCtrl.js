mybccApp.controller('SellCryptoCtrl', function($ionicLoading, $rootScope, $scope,ionicMaterialInk, $ionicPopup, $state, $http, MyPayService, $localStorage, $ionicModal, ConnectivityMonitor, currentPriceOfBTC) {
ionicMaterialInk.displayEffect();
  $scope.sellAmountBCH = "";
  $scope.sellAmountBTC = "";
  $rootScope.user = $localStorage.credentials.user;
  $scope.currentPriceOfBTCtemp = currentPriceOfBTC.currentPrice;
  $scope.currentUserBalance = currentPriceOfBTC.currentPrice;

   $scope.myFunc1 = function(a) {
    $scope.tempSell = a * $scope.currentPriceOfBTCtemp.bid;
    $scope.sellAmount.sellAmountBTC = $scope.tempSell.toFixed(5);
    var sell = angular.element(document.querySelector('#sellCryptoFocus'));
    sell.attr('style', 'transform: translateY(-14px);');
  };

  $scope.sellAmount = {
    "userMailId": $localStorage.credentials.user.email,
    "sellAmountBCH": "",
    "sellAmountBTC": "",
    "spendingPassword": "",
    "commentForReciever": "Comment for Reciever",
    "commentForSender": "Comment for sender"
  }

  $scope.sellAmountAction = function() {
    if ($scope.sellAmount.sellAmountBCH == "" || $scope.sellAmount.sellAmountBTC == "") {
      var alertPopup = $ionicPopup.alert({
        title: "fields should be requied",
      });
    } else {
      if ($scope.sellAmount.sellAmountBCH <= $scope.user.BCHbalance) {
        var alertPopup = $ionicPopup.show({
          template: '<span>Selling@' + $scope.sellAmount.sellAmountBTC / $scope.sellAmount.sellAmountBCH + ' BTC</span><br><br><input type="password" placeholder="spendingPassword" ng-model="sellAmount.spendingPassword">',
          title: 'Enter Spending Password ',
          scope: $scope,
          buttons: [{
              text: 'Cancel',
              onTap: function(e) {
               $scope.sellAmount = {
                  "userMailId": $localStorage.credentials.user.email,
                  "sellAmountBCH": "",
                  "sellAmountBTC": "",
                  "spendingPassword": "",
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
                  MyPayService.sellBCHCoinByUser($scope.sellAmount).then(function(response) {
                    if (response.data.statusCode == 200) {
                      $localStorage.credentials.user = response.data.user;
                      $rootScope.user = $localStorage.credentials.user;
                      $scope.hide($ionicLoading);
                      Materialize.toast('transaction successfully !!', 4000);
                      $scope.sellAmount = {};
                      $state.go('app.cryptovault');
                    } else if (response.data.statusCode >= 400) {
                      $scope.hide($ionicLoading);
                      var alertPopup = $ionicPopup.alert({
                        title: response.data.message,
                      })
                      $scope.sellAmount = {
                          "userMailId": $localStorage.credentials.user.email,
                          "sellAmountBCH": "",
                          "sellAmountBTC": "",
                          "spendingPassword": "",
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
          // console.log('Tapped!', res);
        }, function(err) {
          //  console.log('Err:', err);
        }, function(msg) {
          // console.log('message:', msg);
        });
      } else {
        var alertPopup = $ionicPopup.alert({
          title: 'Insufficient balance',
          template: 'Please Buy VCN'
        });
            $scope.sellAmount = {};
        $state.go('app.dashboard');
      }
    }

  };


  $scope.show = function() {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
  };
  $scope.hide = function() {
    $ionicLoading.hide();
  };
});
