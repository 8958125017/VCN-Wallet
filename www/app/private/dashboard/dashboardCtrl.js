mybccApp.controller('DashboardCtrl', function($rootScope, $scope, $ionicPopup, $state, $window, $timeout, $http, MyPayService, $localStorage,ionicMaterialInk,ConnectivityMonitor) {

  $scope.isSlideUp = true;
  $scope.isSlideDown = false;

  console.log("old rootscope :" + angular.toJson($rootScope.user));
  ionicMaterialInk.displayEffect();
  $rootScope.user = $localStorage.credentials.user;
  console.log("new rootscope :" + angular.toJson($rootScope.user));
  console.log("localStorage" + angular.toJson($localStorage.credentials.user));
  $scope.emailId = {
    "userMailId": $localStorage.credentials.user.email
  }

  $state.reload();
  $scope.doRefresh = function() {
    $timeout(function() {
      console.log("old rootscope :" + angular.toJson($rootScope.user));
      console.log($scope.emailId);
      MyPayService.CurrntBalanceOfBCH($scope.emailId).then(function(response) {      
        if (response.data.statusCode == 200 ) {
          $localStorage.credentials.user = response.data.user;
          $rootScope.user = $localStorage.credentials.user;         
        }
      });

      MyPayService.CurrntBalanceOfBTC($scope.emailId).then(function(response) {       
        if (response.data.statusCode == 200) {
          $localStorage.credentials.user = response.data.user;
          $rootScope.user = $localStorage.credentials.user;
          console.log("User bth balance" + angular.toJson($rootScope.user));
        }
      });

      MyPayService.getBidCoin().then(function(response) {
        if (response.statusCode >= 400) {
          var alertPopup = $ionicPopup.alert({
            title: "Server Message :" + response.message,
          });
        } else {
          $scope.currentUserBalance = response.currentPrice;
         $scope.btcRate = response.currentPrice.ask;
       $scope.usdRate=(1/ $scope.btcRate).toFixed(5);
        }
      });
      $scope.$broadcast('scroll.refreshComplete');

    }, 5000);

  };

  MyPayService.getBidCoin().then(function(response) {
    if (response.statusCode >= 400) {
      var alertPopup = $ionicPopup.alert({
        title: "Server Message :" + response.message,
      });
    } else {
      $scope.currentUserBalance = response.currentPrice;
       $scope.btcRate = response.currentPrice.ask;
       $scope.usdRate=(1/ $scope.btcRate).toFixed(5);
    }
  });

    $scope.getCrypto=function(){ 
  if (ConnectivityMonitor.isOffline()) {
      Materialize.toast("internet is disconnected on your device !!",4000);   
    } else {       
    $state.go('app.getCrypto');
  }
  }

  
  $scope.BuyBch=function(){ 
  if (ConnectivityMonitor.isOffline()) {
      Materialize.toast("internet is disconnected on your device !!",4000);   
    } else {       
    $state.go('app.buycrypto');
  }
  }
  $scope.SellBch=function(){
  if (ConnectivityMonitor.isOffline()) {
     Materialize.toast("internet is disconnected on your device !!",4000);   
    } else { 
    $state.go('app.sellcrypto');
  }
  }
  $scope.bidCrypto=function(){ 
  if (ConnectivityMonitor.isOffline()) {
      Materialize.toast("internet is disconnected on your device !!",4000);   
    } else {       
    $state.go('app.bidcrypto');
  }
  }
  $scope.askCrypto=function(){
  if (ConnectivityMonitor.isOffline()) {
      Materialize.toast("internet is disconnected on your device !!",4000);   
    } else { 
    $state.go('app.askcrypto');
  }
  }

  $scope.showBalanceSlideup = function(){
    $scope.isSlideUp = false;
    $scope.isSlideDown = true;

   var myEl = angular.element(document.querySelector('#downDiv')); 
   myEl.attr('style', 'top:-315px !important; position : relative;transition: .5s all ease;');

    // transform: rotateY(180deg);
    var roateSlideUpDiv = angular.element(document.querySelector('#rotateSlideUp'));
    roateSlideUpDiv.attr('style', 'transform:rotateY(180deg)');

  }

  $scope.showBalanceSlideDown = function(){
    $scope.isSlideUp = true;
    $scope.isSlideDown = false;

   var myEl = angular.element(document.querySelector('#downDiv'));
   myEl.attr('style', 'bottom:-553px;');
  }


});
