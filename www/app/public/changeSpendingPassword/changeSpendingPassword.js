 mybccApp.controller('ChangeSpendingPassword', function($scope, $state, ionicMaterialInk,$ionicLoading, ConnectivityMonitor, $rootScope, $ionicPopup, $localStorage, MyPayService, getCurrentUserData) {
  ionicMaterialInk.displayEffect();
   $scope.newSpendingPasswordvalue = {
     "userMailId": getCurrentUserData.email,
     "newSpendingPassword": "",
     "confirmSpendingPassword": ""
   }
   // change spending password
   $scope.newSpendingPassword = function(newSpendingPasswordvalue) {
     console.log(" password = =" + angular.toJson($scope.newSpendingPasswordvalue))
     if ($scope.newSpendingPasswordvalue.newSpendingPassword == "") {
       var alertPopup = $ionicPopup.alert({
         title: "please enter new password",
       });
     } else if ($scope.newSpendingPasswordvalue.confirmSpendingPassword == "") {
       var alertPopup = $ionicPopup.alert({
         title: "please enter confirm new password ",
       });
     } else if (ConnectivityMonitor.isOffline()) {
       Materialize.toast("internet is disconnected on your device !!",4000);   
     } else {
       $scope.show($ionicLoading);
       MyPayService.setNewSpendingPassord($scope.newSpendingPasswordvalue).then(function(response) {
         if (response.data.statusCode == 200) {
           $scope.hide($ionicLoading);
           var alertPopup = $ionicPopup.alert({
             title: "Spending Password update successfully",
           });
           $scope.newSpendingPasswordvalue = {
             "newSpendingPassword": "",
             "confirmSpendingPassword": ""
           };
           $state.go('userlogin');
         } else {
           $scope.hide($ionicLoading);
           var alertPopup = $ionicPopup.alert({
             title: response.data.message,
           });
           $scope.newSpendingPasswordvalue = {
             "newSpendingPassword": "",
             "confirmSpendingPassword": ""
           };
         }
       });
     }
   }


   $scope.show = function() {
     $ionicLoading.show({
       template: '<p>Loading...</p><ion-spinner></ion-spinner>'
     });
   };

   $scope.hide = function() {
     $ionicLoading.hide();
   };


 });
