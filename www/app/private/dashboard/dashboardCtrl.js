mybccApp.controller('DashboardCtrl', function($rootScope, $scope, $ionicPopup, $state, $window, $timeout, $http, MyPayService, $localStorage, ionicMaterialInk, ConnectivityMonitor) {
 
  ionicMaterialInk.displayEffect();

     $scope.emailId = {
       "userMailId": ""
  }

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


});
