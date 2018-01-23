mybccApp.controller('DepositeBTCCtrl', ['$rootScope', '$scope', '$cordovaClipboard', '$cordovaSocialSharing', '$ionicPopup', '$ionicActionSheet', '$timeout', '$localStorage',  'MyPayService', 'ConnectivityMonitor', 'ionicMaterialInk', function($rootScope, $scope, $cordovaClipboard, $cordovaSocialSharing, $ionicPopup, $ionicActionSheet, $timeout, $localStorage, MyPayService, ConnectivityMonitor,ionicMaterialInk) {    
  ionicMaterialInk.displayEffect();
   $rootScope.user = $localStorage.credentials.user;
}]);
