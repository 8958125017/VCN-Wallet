mybccApp.controller('AccountBCHStatementCtrl', function($ionicLoading, ConnectivityMonitor, $scope, $localStorage, $ionicPopup, MyPayService, ionicMaterialInk,getCurrentUserData) {
  ionicMaterialInk.displayEffect();
  $scope.show = function() {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
  };
  $scope.hide = function() {
    $ionicLoading.hide();
  };
  $scope.values = {
    "currency":"",
    "userMailId": ""
  }
  if (ConnectivityMonitor.isOffline()) {
    Materialize.toast("internet is disconnected on your device !!", 4000);
  } else {
    $scope.show($ionicLoading);
    $scope.values.currency="BTC";
    $scope.values.userMailId=getCurrentUserData.email;
    MyPayService.getCoinTransactionsList($scope.values).then(function(response) {
      console.log("Response :: " + angular.toJson(response));
      if (response.data.statusCode == 200) {
        $scope.hide($ionicLoading);
        $scope.data = response.data.tx;
        console.log("data category" + angular.toJson($scope.data));
        if ($scope.data.length == 0) {
          $scope.noData = true;
          $scope.hide($ionicLoading);
        }
      } else  {
        $scope.hide($ionicLoading);
        var alertPopup = $ionicPopup.alert({
          title: response.data.message,
        });
      }
    });
  }

  $scope.transDetails = function(id) {
    $scope.id = id;
    var confirmPopup = $ionicPopup.confirm({
      title: 'Transaction Details',
      scope: $scope,
      template: '<div class="center" style="font-size:12px" ng-click="copyTransactionAddress(id)">' + id + '</div>'
    });
    confirmPopup.then(function(res) {
      if (res) {
        console.log('You are sure');
      } else {
        console.log('You are not sure');
      }
    });
  }

  $scope.copyTransactionAddress = function(id) {
    console.log(id);
    $cordovaClipboard.copy(id).then(function() {
      console.log("Copied text");
      Materialize.toast('Text Copied !!', 2000);
    }, function() {
      console.error("There was an error copying");
    });
  }

});
