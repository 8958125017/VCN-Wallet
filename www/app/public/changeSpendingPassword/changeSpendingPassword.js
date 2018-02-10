 mybccApp.controller('ChangeSpendingPassword', function($scope, $state, ionicMaterialInk, $ionicLoading, ConnectivityMonitor, $rootScope, $ionicPopup, $localStorage, MyPayService, getCurrentUserData) {
   ionicMaterialInk.displayEffect();
   $scope.newSpendingPasswordvalue = {
     "userMailId": "",
     "currentPassword":"",
     "newPin": "",
     "confirmNewPin": ""
   }
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
       $scope.passStrength = "strong";
     } else if (mediumRegularExp.test(value)) {
       $scope.checkpwdStrength["background-color"] = "orange";
       $scope.passStrength = "medium";
     } else {
       $scope.checkpwdStrength["background-color"] = "red";
       $scope.passStrength = "weak";
     }
   };


   // change spending password
   $scope.newSpendingPassword = function(newSpendingPasswordvalue) {    
     if ($scope.newSpendingPasswordvalue.newSpendingPassword == "") {
       var alertPopup = $ionicPopup.alert({
         title: "please enter new password",
       });
     } else if ($scope.newSpendingPasswordvalue.confirmSpendingPassword == "") {
       var alertPopup = $ionicPopup.alert({
         title: "please enter confirm new password ",
       });
     } else if (ConnectivityMonitor.isOffline()) {
       Materialize.toast("internet is disconnected on your device !!", 4000);
     } else {
       $scope.show($ionicLoading);
       $scope.newSpendingPasswordvalue.userMailId=getCurrentUserData.email;       
       MyPayService.setNewSpendingPassord($scope.newSpendingPasswordvalue).then(function(response) {
         if (response.data.statusCode == 200) {
           $scope.hide($ionicLoading);
           var alertPopup = $ionicPopup.alert({
             title: "PIN update successfully",
           });
           $scope.newSpendingPasswordvalue = {
             "currentPassword":"",
             "newPin": "",
             "confirmNewPin": ""
           };
           $state.go('userlogin');
         } else {
           $scope.hide($ionicLoading);
           var alertPopup = $ionicPopup.alert({
             title: response.data.message,
           });
           $scope.newSpendingPasswordvalue = {
             "currentPassword":"",
             "newPin": "",
             "confirmNewPin": ""
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


   $scope.passwordMatch = function(password) {
     if ($scope.newSpendingPasswordvalue.confirmNewPin != password) {
       $scope.noData = true;
     } else {
       $scope.noData = false;
     }
   }

   $(document).ready(function () {
  //called when key is pressed in textbox
  $("#pinNum").keypress(function (e) {
     //if the letter is not digit then display error and don't type anything
     if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message
        $("#errmsg").html("Digits Only").show().fadeOut("slow");
               return false;
    }
   });
});
$(document).ready(function () {
  //called when key is pressed in textbox
  $("#confirmPin").keypress(function (e) {
     //if the letter is not digit then display error and don't type anything
     if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message
        $("#errmsg").html("Digits Only").show().fadeOut("slow");
               return false;
    }
   });
});

 });
