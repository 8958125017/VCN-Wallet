mybccApp.controller('TourCtrl', function($rootScope, $scope, $location, $ionicPopup, $state, $window, $timeout, $http, MyPayService, $localStorage, ionicMaterialInk, ConnectivityMonitor) {

  $scope.login = function() {
    localStorage.setItem('firstVisit', '1');
     $location.url('/userlogin');
    // $state.go('userlogin');
  }
  $scope.signUp = function() {
    localStorage.setItem('firstVisit', '1');
    $location.url('/signup');
   // $state.go('signup');
  }

});
