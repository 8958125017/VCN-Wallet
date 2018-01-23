mybccApp.controller('BidCryptoCtrl', function($ionicLoading, $rootScope, $scope, ConnectivityMonitor, $ionicPopup, $state, $http, MyPayService, $localStorage, $ionicModal, currentPriceOfBTC,ionicMaterialInk) {
ionicMaterialInk.displayEffect();
  $scope.show = function() {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
  };

  $scope.hide = function() {
    $ionicLoading.hide();
  };

  $rootScope.user = $localStorage.credentials.user;
  $scope.currentPriceOfBTCtemp = currentPriceOfBTC.currentPrice;
  console.log("test2 = =" +angular.toJson($scope.currentPriceOfBTCtemp));
  $scope.myFunc = function(a) {    
    $scope.bidCryptoAmount.bidAmountBTC = a.toFixed(5);
    console.log($scope.bidCryptoAmount.bidAmountBTC);
    var myEl = angular.element(document.querySelector('#focusLabel'));
    myEl.attr('style', 'transform: translateY(-14px);');
  };

  $scope.bidCryptoAmount = {
    "bidAmountBTC": "",
    "bidAmountBCH": "",
    "bidRate": "",
    "bidownerId": $localStorage.credentials.user.id,
    "currentBidRateOfServer": $scope.currentPriceOfBTCtemp.bid,
    "spendingPassword": ""
  }


  $scope.bidAmountAction = function() {
    console.log("current" + $scope.currentPriceOfBTCtemp.bid + "- Bidprice" + $scope.bidCryptoAmount.bidRate + "=" + ($scope.currentPriceOfBTCtemp.bid  - $scope.bidCryptoAmount.bidRate));
    if ($scope.bidCryptoAmount.bidAmountBCH == "" || $scope.bidCryptoAmount.bidAmountBTC == "" || $scope.bidCryptoAmount.bidRate == "") {
      var alertPopup = $ionicPopup.alert({
        title: "fields should be required",
      });

    } else if ($scope.bidCryptoAmount.bidAmountBTC >= $rootScope.user.BTCbalance) {
      var alertPopup = $ionicPopup.alert({
        title: 'Insufficient balance',
        template: 'Please Buy BCC'
      });
      $state.go('app.dashboard');
      $scope.bidCryptoAmount = {
                "bidAmountBTC": "",
                "bidAmountBCH": "",
                "bidRate": "",
                "bidownerId": $localStorage.credentials.user.id,
                "currentBidRateOfServer": $scope.currentPriceOfBTCtemp.bid,
                "spendingPassword": ""
              }
    } else if ($scope.currentPriceOfBTCtemp.bid  - $scope.bidCryptoAmount.bidRate >= 0.01) {
      var alertPopup = $ionicPopup.alert({
        title: 'Invalid rate',
        template: 'try after some time'
      });
      $state.go('app.dashboard');
      $scope.bidCryptoAmount = {};
    } else {
      console.log(angular.toJson($scope.bidCryptoAmount));
      var alertPopup = $ionicPopup.show({
        template: '<span>Biding' + $scope.bidCryptoAmount.bidAmountBTC + ' BTC @ ' + $scope.bidCryptoAmount.bidRate +'bch/btc</span><br><br><input type="password" placeholder="spendingPassword" ng-model="bidCryptoAmount.spendingPassword">',
        title: 'Enter Spending Password ',
        scope: $scope,
        buttons: [{
            text: 'Cancel',
            onTap: function(e) {
              $scope.bidCryptoAmount = {
                        "bidAmountBTC": "",
                        "bidAmountBCH": "",
                        "bidRate": "",
                        "bidownerId": $localStorage.credentials.user.id,
                        "currentBidRateOfServer": $scope.currentPriceOfBTCtemp.bid,
                        "spendingPassword": ""
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
                MyPayService.bidCryptoAmount($scope.bidCryptoAmount).then(function(response) {
                  console.log("response = " + angular.toJson(response));
                  if (response.data.statusCode == 200) {
                    $localStorage.credentials.user = response.data.user;
                    $rootScope.user = $localStorage.credentials.user;
                    Materialize.toast('Bid Placed Successfully !!', 4000);
                    $scope.hide($ionicLoading);
                    $scope.bidCryptoAmount = {
                        "bidAmountBTC": "",
                        "bidAmountBCH": "",
                        "bidRate": "",
                        "bidownerId": $localStorage.credentials.user.id,
                        "currentBidRateOfServer": $scope.currentPriceOfBTCtemp.bid,
                        "spendingPassword": ""
                      }
                    $state.go('app.dashboard');
                  } else{
                    $scope.hide($ionicLoading);
                    var alertPopup = $ionicPopup.alert({
                      title: response.data.message,
                    });      
                     $scope.bidCryptoAmount = {
                        "bidAmountBTC": "",
                        "bidAmountBCH": "",
                        "bidRate": "",
                        "bidownerId": $localStorage.credentials.user.id,
                        "currentBidRateOfServer": $scope.currentPriceOfBTCtemp.bid,
                        "spendingPassword": ""
                      }            
                    $state.go('app.bidcrypto');
                  }
                });
              }
            }
          },
        ]
      })
    }
  };
});
