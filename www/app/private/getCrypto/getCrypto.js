mybccApp.controller('GetVCNCtrl', function($scope,$rootScope, $state,$ionicLoading, ConnectivityMonitor, $localStorage, $ionicPopup, MyPayService,ionicMaterialInk) {
  MyPayService.getBidCoin().then(function(response) {
    if (response.statusCode >= 400) {
      var alertPopup = $ionicPopup.alert({
        title: "Server Message :" + response.message,
      });
    } else {
      $scope.currentUserBalance = response.currentPrice.ask;
      $scope.usdRate=(1/ $scope.currentUserBalance).toFixed(8);
      console.log("$scope.currentUserBalance = = ="+$scope.currentUserBalance)
    }
  });

  $rootScope.user = $localStorage.credentials.user; 

  ionicMaterialInk.displayEffect();

  $scope.init = function(){
    $scope.isDisable = true;
  };

 $scope.show = function() {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
  };

  $scope.hide = function() {
    $ionicLoading.hide();
  };

  $scope.VCNtxDetail = {
    "txId":"",
    "amount": "",
    "email": $localStorage.credentials.user.email
  }
 $scope.btcindollor={
  "btcDoller":""
 }
   
  $scope.shareRequestForVCN = function(user) {   
     if (ConnectivityMonitor.isOffline()) {
      Materialize.toast("internet is disconnected on your device !!",4000);   
    } else {
      $scope.show($ionicLoading);
      MyPayService.VCNtransactions($scope.VCNtxDetail).then(function(response) {
        console.log(angular.toJson(response));
        if (response.data.statusCode == 200) {        
          $scope.hide($ionicLoading);
           $scope.hide($ionicLoading);
          var alertPopup = $ionicPopup.alert({
            title: response.data.message,
          });
          $scope.VCNtxDetail="";
          $state.go('app.dashboard');
        } else {
           $scope.VCNtxDetail="";
          $scope.hide($ionicLoading);
          var alertPopup = $ionicPopup.alert({
            title: response.data.message,
          });
        }
      });
    }
  };
  
  $scope.myFunc = function(a) {   
   $scope.btcindollor.btcDoller=a*$scope.currentUserBalance;
   var myEl = angular.element(document.querySelector('#focusLabel'));
    myEl.attr('style', 'transform: translateY(-14px);');
  };
  
$scope.init();

});
