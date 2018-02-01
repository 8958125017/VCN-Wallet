mybccApp.controller('DashboardCtrl', function($rootScope, $scope, $ionicPopup, $state, $window, $timeout, $http, MyPayService, $localStorage,$ionicLoading, ionicMaterialInk, ConnectivityMonitor,getCurrentUserData) {
 
  ionicMaterialInk.displayEffect();

     $scope.emailId = {
       "userMailId": ""
  }


   $scope.emailId.userMailId=getCurrentUserData.email;
   $scope.show = function() {
    $ionicLoading.show({
      template: '<p>Loading please wait...</p><ion-spinner></ion-spinner>'
    });
  };
  $scope.hide = function() {
    $ionicLoading.hide();
  };
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

  $scope.doRefresh = function() {
    $timeout(function() {     
       $rootScope.user = $localStorage.credentials;
       $scope.emailId.userMailId=$rootScope.user.email;
      MyPayService.CurrntBalance($scope.emailId).then(function(response) {       
        if (response.data.statusCode == 200) {
           $localStorage.cryptoBalance = response.data;
            $rootScope.userBal = $localStorage.cryptoBalance;
        }
      });      

      MyPayService.getBidCoin().then(function(response) {    
         if (response.statusCode == 200) {          
               $rootScope.usdRate = response.currentBTCprice;          
               } 
          });

      $scope.$broadcast('scroll.refreshComplete');
    }, 4000);

  };

  $scope.getCrypto = function() {
    $state.go('app.getCrypto');
  }

  //$scope.init();
});
