mybccApp.controller('BuyCryptoCtrl', function($ionicLoading, $rootScope, $scope, ConnectivityMonitor, $ionicPopup, $state, $http, MyPayService, $localStorage, $ionicModal, currentPriceOfBTC,ionicMaterialInk) {
ionicMaterialInk.displayEffect();
  $scope.show = function()
  {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
  };

  $scope.hide = function() {
    $ionicLoading.hide();
  };
  $rootScope.user = $localStorage.credentials.user;
  $scope.buyAmountSend = {
    "userMailId": $localStorage.credentials.user.email,
    "buyAmountBCH": "",
    "buyAmountBTC": "",
    "spendingPassword": "",
    "commentForReciever": "Comment for Reciever",
    "commentForSender": "Comment for sender"
  };

  $scope.buyAmountBCH = "";
  $scope.buyAmountBTC = "";
  $rootScope.user = $localStorage.credentials.user;
  $scope.currentPriceOfBTCtemp = currentPriceOfBTC.currentPrice;
  $scope.currentUserBalance = currentPriceOfBTC.currentPrice;

  $scope.function1 = function() {
    $scope.show($ionicLoading);
    $scope.buyAmountSend.buyAmountBCH = "";
    $scope.buyAmountSend.buyAmountBTC = "";
    $scope.sellAmount.buyAmountBCH = "";
    $scope.sellAmount.buyAmountBTC = "";
    MyPayService.getBidCoin().then(function(response) {
      if (response.statusCode >= 400) {
        var alertPopup = $ionicPopup.alert({
          title: "Server Message :" + response.data.message,
        });
      } else {
        $scope.hide($ionicLoading);
        $scope.currentPriceOfBTCtemp = response.currentPrice;
      }
    });
  }

  //Buy BCH
   $scope.myFunc = function(a) {
    $scope.tempBuy = a * ($scope.currentPriceOfBTCtemp.ask + .002);
    $scope.buyAmountSend.buyAmountBTC = $scope.tempBuy.toFixed(5);
    var buy = angular.element(document.querySelector('#buyCryptoFocus'));
    buy.attr('style', 'transform: translateY(-14px);');
  };

  $scope.buyAmountAction = function() {
    console.log("1 = "+$scope.buyAmountSend.buyAmountBCH);
    console.log("2 = "+$scope.buyAmountSend.buyAmountBTC);
    console.log("3 = "+$scope.buyAmountSend);
      if ($scope.buyAmountSend.buyAmountBCH == "" || $scope.buyAmountSend.buyAmountBTC == "") {
      var alertPopup = $ionicPopup.alert({
        title: "fields should be requied",
      });
    } else {
      console.log("2 = "+$scope.buyAmountSend.buyAmountBTC);
      if ($scope.buyAmountSend.buyAmountBTC < $scope.user.BTCbalance) {
        var alertPopup = $ionicPopup.show({
          template: '<span>Buying@' + $scope.buyAmountSend.buyAmountBTC / $scope.buyAmountSend.buyAmountBCH + ' BTC</span><br><br><input type="password" placeholder="spendingPassword" ng-model="buyAmountSend.spendingPassword">',
          title: 'Enter Spending Password ',
          scope: $scope,
          buttons: [{
              text: 'Cancel',
              onTap: function(e) {
                $scope.buyAmountSend = {
                    "userMailId": $localStorage.credentials.user.email,
                    "buyAmountBCH": "",
                    "buyAmountBTC": "",
                    "spendingPassword": "",
                    "commentForReciever": "Comment for Reciever",
                    "commentForSender": "Comment for sender"
                  };
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
                  MyPayService.buyBCHCoinByUser($scope.buyAmountSend).then(function(response) {
                    if (response.data.statusCode == 200) {
                      $scope.hide($ionicLoading);
                      $localStorage.credentials.user = response.data.user;
                      $rootScope.user = $localStorage.credentials.user;
                      Materialize.toast('transaction successfully !!', 4000);
                      $scope.buyAmountSend = {};
                      $state.go('app.cryptovault');
                    } else if (response.data.statusCode >= 400) {
                      var alertPopup = $ionicPopup.alert({
                        title: response.data.message,
                      });
                     $scope.buyAmountSend = {
                          "userMailId": $localStorage.credentials.user.email,
                          "buyAmountBCH": "",
                          "buyAmountBTC": "",
                          "spendingPassword": "",
                          "commentForReciever": "Comment for Reciever",
                          "commentForSender": "Comment for sender"
                        };
                      $state.go('app.dashboard');
                    }
                  });
                }
              }
            },
          ]
        }).then(function(res) {
          // console.log('Tapped!', res);
        }, function(err) {
          // console.log('Err:', err);
        }, function(msg) {
          // console.log('message:', msg);
        });
      } else {
        var alertPopup = $ionicPopup.alert({
          title: 'Insufficient balance',
          template: 'Please First Buy BTC'
        });
        $scope.buyAmountSend = {};
        $state.go('app.dashboard');
      }
    }

  };
});
