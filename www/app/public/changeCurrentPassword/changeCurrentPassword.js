 mybccApp.controller('ChangeCurrentPasswordCtrl', function($scope, $state, ionicMaterialInk,$ionicLoading, ConnectivityMonitor, $rootScope, $ionicPopup, $localStorage, MyPayService, getCurrentUserData) {
  ionicMaterialInk.displayEffect();


     $scope.passwordValue = {
    "userMailId": getCurrentUserData.email,
    "currentPassword": "",
    "newPassword": "",
    "confirmNewPassword": ""
  };
var strongRegularExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
var mediumRegularExp = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{5,})");
$scope.checkpwdStrength = {
        "width": "150px",
        "height": "17px",
        "float": "left"
      };

$scope.validationInputPwdText = function(value) {
        if (strongRegularExp.test(value)) {
          $scope.checkpwdStrength["background-color"] = "green";
          $scope.passStrength="strong";
        } else if (mediumRegularExp.test(value)) {
          $scope.checkpwdStrength["background-color"] = "orange";
          $scope.passStrength="medium";
        } else {
          $scope.checkpwdStrength["background-color"] = "red";
           $scope.passStrength="week";
        }
      };


   // change spending password
   $scope.newCurrentPassword = function(passwordValue) {
     console.log(" password = =" + angular.toJson($scope.passwordValue))
 if (ConnectivityMonitor.isOffline()) {
       Materialize.toast("internet is disconnected on your device !!",4000);   
     } else {
       $scope.show($ionicLoading);
       MyPayService.changepasswords($scope.passwordValue).then(function(response) {
         if (response.data.statusCode == 200) {
           $scope.hide($ionicLoading);
           var alertPopup = $ionicPopup.alert({
             title: "Current Password Change successfully",
           });
           $scope.passwordValue = {
             "newPassword": "",
             "confirmNewPassword": ""
           };
           $state.go('userlogin');
         } else {
           $scope.hide($ionicLoading);
           var alertPopup = $ionicPopup.alert({
             title: response.data.message,
           });
           $scope.passwordValue = {
             "newPassword": "",
             "confirmNewPassword": ""
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


$scope.passwordMatch=function(password){
  console.log("password == = "+password);
   console.log("password == = "+$scope.passwordValue.confirmNewPassword);
if($scope.passwordValue.confirmNewPassword!=password){
  $scope.noData = true;
}else{
   $scope.noData = false;
}
}

 });
