mybccApp.controller('GetVCNCtrl', function($scope, $rootScope, $state, $ionicLoading, ConnectivityMonitor, $localStorage, $ionicPopup, MyPayService, ionicMaterialInk,getCurrentUserData) {
    ionicMaterialInk.displayEffect();
   $rootScope.user = $localStorage.credentials;
   MyPayService.getBidCoin().then(function(response) {    
         if (response.statusCode == 200) {          
               $rootScope.usdRate = response.currentBTCprice;          
               } 
          });
   MyPayService.getVCNprice().then(function(response) {  
        console.log("response = = "+angular.toJson(response));  
         if (response.statusCode == 200) {  
              console.log("response.askRate "+response.askRate)        
               $rootScope.vcnRate = response.askRate;         
                console.log("$rootScope.vcnRate "+$rootScope.vcnRate)   
               } 
          });
  

  $scope.init = function() {
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
    "spendingPassword": "",
    "amount": "",
    "email": getCurrentUserData.email
  }
  $scope.btcindollor = {
    "btcDoller": "0.00000000"
  }

  $scope.shareRequestForVCN = function(user) {
    console.log("$scope.VCNtxDetail = = "+angular.toJson($scope.VCNtxDetail));
    if (ConnectivityMonitor.isOffline()) {
      Materialize.toast("internet is disconnected on your device !!", 4000);
    } else {
      var alertPopup = $ionicPopup.show({
        template: '<span>Get@' + '{{ btcindollor.btcDoller}}' + ' VCN</span><br><br><input type="number" placeholder="PIN" ng-model="VCNtxDetail.spendingPassword">',
        title: 'Enter Spending Password ',
        scope: $scope,
        buttons: [{
            text: 'Cancel',
            onTap: function(e) {
              $scope.VCNtxDetail = {
                "email": "",
                "amount": "",
                "spendingPassword": ""
              };
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
                MyPayService.VCNtransactions($scope.VCNtxDetail).then(function(response) {
                  console.log(angular.toJson(response));
                  if (response.data.statusCode == 200) {
                    $scope.hide($ionicLoading);
                      var alertPopup = $ionicPopup.alert({
                      title: response.data.message,
                    });
                     $scope.VCNtxDetail = {
                     "email": "",
                     "amount": "",
                      "spendingPassword": ""
              };
                    $state.go('app.dashboard');
                  } else {
                    $scope.VCNtxDetail = "";
                    $scope.hide($ionicLoading);
                    var alertPopup = $ionicPopup.alert({
                      title: response.data.message,
                    });
                  }
                });

              }
            }
          },
        ]
      });

    }
  };

  $scope.myFunc = function(a) {
    console.log("$rootScope.vcnRate "+$rootScope.vcnRate)
    console.log("a "+a)
    if(a){
     console.log("$rootScope.vcnRate "+$rootScope.vcnRate)
    $scope.btcindollor.btcDoller = (parseFloat(a)* parseFloat($rootScope.vcnRate.replace(/\,/g,''))).toPrecision(7);
  }else{
    $scope.btcindollor.btcDoller = 0;
  }
    console.log("$scope.btcindollor.btcDoller = = "+$scope.btcindollor.btcDoller);
    var myEl = angular.element(document.querySelector('#focusLabel'));
    myEl.attr('style', 'transform: translateY(-14px);');
  };
  $scope.init();
});
