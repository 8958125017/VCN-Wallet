mybccApp.controller('GetVCNCtrl', function($scope, $rootScope, $state, $ionicLoading, ConnectivityMonitor, $localStorage, $ionicPopup, MyPayService, ionicMaterialInk,getCurrentUserData) {
    ionicMaterialInk.displayEffect();
     $rootScope.user = $localStorage.credentials;
    // alert("json "+angular.toJson($localStorage.credentials));
    $scope.show = function() {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
  };

  $scope.hide = function() {
    $ionicLoading.hide();
  };
   
   $scope.emailId = {
       "userMailId": ""
  }
  $scope.emailId.userMailId=getCurrentUserData.email;
    if (ConnectivityMonitor.isOffline()) {
      Materialize.toast("internet is disconnected on your device !!", 4000);
    } else {
          $scope.show($ionicLoading);
   MyPayService.CurrntBalance($scope.emailId).then(function(response) {       
        if (response.data.statusCode == 200) {
          $scope.hide($ionicLoading);   
           $localStorage.cryptoBalance = response.data;
            $rootScope.userBal = $localStorage.cryptoBalance;
        }
      });  
   MyPayService.getBidCoin().then(function(response) {    
         if (response.statusCode == 200) {     
               $scope.hide($ionicLoading);     
               $rootScope.usdRate = response.currentBTCprice;          
               } 
          });
   MyPayService.getVCNprice().then(function(response) {        
         if (response.statusCode == 200) {        
              $scope.hide($ionicLoading);             
               $rootScope.vcnRate = response.askRate; 
               } 
          });
  }

  $scope.init = function() {
    $scope.isDisable = true;
  };

  

  $scope.VCNtxDetail = {
    "spendingPassword": "",
    "amount": "",
    "userMailId": ""
  }
  $scope.btcindollor = {
    "btcDoller": "0.00000000"
  }

  $scope.shareRequestForVCN = function(user) {   
    if (ConnectivityMonitor.isOffline()) {
      Materialize.toast("internet is disconnected on your device !!", 4000);
    } else {
      var alertPopup = $ionicPopup.show({
        template: '<input type="number" placeholder="Enter your PIN" ng-model="VCNtxDetail.spendingPassword">',
        title: 'Enter PIN ',
        scope: $scope,
        buttons: [{
            text: 'Cancel',
            onTap: function(e) {
              $scope.VCNtxDetail = {
                "userMailId": "",
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
              if ($scope.VCNtxDetail.spendingPassword == "") {
                     var alertPopup = $ionicPopup.alert({
                  title: "Please enter pin",
                 });
             }
              else  if (ConnectivityMonitor.isOffline()) {               
                Materialize.toast("internet is disconnected on your device !!", 4000);
              } else {
                $scope.show($ionicLoading);
                 $scope.VCNtxDetail.userMailId=getCurrentUserData.email;                
                MyPayService.VCNtransactions($scope.VCNtxDetail).then(function(response) {
                
                  if (response.data.statusCode == 200) {
                    $scope.hide($ionicLoading);
                      var alertPopup = $ionicPopup.alert({
                      title: response.data.message,
                    });
                     $scope.VCNtxDetail = {
                     "userMailId": getCurrentUserData.email,
                     "amount": "",
                     "spendingPassword": ""
                    };
                    $state.go('app.dashboard');
                  } else {

                     $scope.hide($ionicLoading);
                     console.log("responss"+angular.toJson(response));
                    $scope.VCNtxDetail = {
                     //"amount": "",
                     "spendingPassword": ""
                    };
                    var alertPopup = $ionicPopup.alert({
                      title: response.data.message,
                    });
                    //$state.go('app.dashboard');
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
    if(a){     
    $scope.btcindollor.btcDoller = (parseFloat(a)* parseFloat($rootScope.vcnRate.replace(/\,/g,''))).toPrecision(7);
  }else{
    $scope.btcindollor.btcDoller = 0;
  }  
    var myEl = angular.element(document.querySelector('#focusLabel'));
    myEl.attr('style', 'transform: translateY(-14px);');
  };
  $scope.init();
});
