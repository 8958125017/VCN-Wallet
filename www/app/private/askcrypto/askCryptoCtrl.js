mybccApp.controller('AskCryptoCtrl', function($ionicLoading, $rootScope, ConnectivityMonitor, $scope, $ionicPopup, $state, $http, MyPayService, $localStorage, $ionicModal, currentPriceOfBTC,ionicMaterialInk) {
 ionicMaterialInk.displayEffect();
  $scope.show = function() {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
  };

  $scope.hide = function() {
    $ionicLoading.hide();
  };

  $scope.askAmountBCH = "";
  $scope.askAmountBTC = "";
  $rootScope.user = $localStorage.credentials.user;
  $scope.currentUserBalance = currentPriceOfBTC.currentPrice;
  $scope.currentPriceOfBTCtemp = currentPriceOfBTC.currentPrice;

  $scope.myFunc = function(a) {
    $scope.askCryptoAmount.askAmountBTC = a.toFixed(5);
    console.log($scope.askCryptoAmount.askAmountBTC);
    var myEl = angular.element(document.querySelector('#focusLabel'));
    myEl.attr('style', 'transform: translateY(-14px);');
  };

  $scope.askCryptoAmount = {
    "askAmountBTC": "",
    "askAmountBCH": "",
    "askRate": "",
    "askownerId": $localStorage.credentials.user.id,
    "currentAskrateOfServer": $scope.currentPriceOfBTCtemp.ask,
    "spendingPassword": ""
  };

  $scope.askAmountAction = function() {
    if ($scope.askCryptoAmount.askAmountBCH == "" || $scope.askCryptoAmount.askRate == "" || $scope.askCryptoAmount.askAmountBTC == "") {
      var alertPopup = $ionicPopup.alert({
        title: "field should be required",
      });
    } else if ($scope.askCryptoAmount.askAmountBCH >= $rootScope.user.BCHbalance) {
      var alertPopup = $ionicPopup.alert({
        title: 'Insufficient balance',
        template: 'Please Buy BCC'
      });
      $scope.askCryptoAmount = {};
      $state.go('app.dashboard');
    } else if ($scope.askCryptoAmount.askRate - $scope.currentPriceOfBTCtemp.ask >= 0.01) {
      var alertPopup = $ionicPopup.alert({
        title: 'Invalid Rate',
        template: 'please enter right value'
      });
      $scope.askCryptoAmount = {};
      $state.go('app.dashboard');
    } else {
      console.log(angular.toJson($scope.askCryptoAmount));
      var alertPopup = $ionicPopup.show({
        template: '<span>Asking ' + $scope.askCryptoAmount.askAmountBTC + ' BTC @ ' + $scope.askCryptoAmount.askRate +'bch/btc</span><br><br><input type="password" placeholder="spendingPassword" ng-model="askCryptoAmount.spendingPassword">',
        title: 'Enter Spending Password ',
        scope: $scope,
        buttons: [{
            text: 'Cancel',
            onTap: function(e) {
              $scope.askCryptoAmount = {};
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
                MyPayService.askCryptoAmount($scope.askCryptoAmount).then(function(response) {
                  console.log("response Ask= " + angular.toJson(response));
                  if (response.data.statusCode == 200) {
                    $localStorage.credentials.user = response.data.user;
                    $rootScope.user = $localStorage.credentials.user;
                    console.log("$rootScope= " + angular.toJson($rootScope.user));
                    $scope.hide($ionicLoading);
                    Materialize.toast('Ask Placed Successfully !!', 4000);
                    $scope.askCryptoAmount = {
                      "askAmountBTC": "",
                      "askAmountBCH": "",
                      "askRate": "",
                      "askownerId": $localStorage.credentials.user.id,
                      "currentAskrateOfServer": $scope.currentPriceOfBTCtemp.ask,
                      "spendingPassword": ""
                    };
                    $state.go('app.dashboard');
                  } else if (response.data.statusCode >= 400) {
                    $scope.hide($ionicLoading);
                    var alertPopup = $ionicPopup.alert({
                      title: response.data.message,
                    });
                    $scope.askCryptoAmount = {
                      "askAmountBTC": "",
                      "askAmountBCH": "",
                      "askRate": "",
                      "askownerId": $localStorage.credentials.user.id,
                      "currentAskrateOfServer": $scope.currentPriceOfBTCtemp.ask,
                      "spendingPassword": ""
                    };
                    $state.go('app.askcrypto');
                  }
                });
              }
            }
          },
        ]
      })

    }
  };
})
