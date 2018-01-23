angular.module('starter.controllers', [])

mybccApp.controller('AppCtrl', function($scope, $ionicModal, $timeout, ionicMaterialInk) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
    ionicMaterialInk.displayEffect();
})


mybccApp.controller('btcVaultCtrl',function($scope, $ionicPopup, $timeout, $ionicActionSheet) {
     $scope.showShare = function() {

           // Show the action sheet
           var hideSheet = $ionicActionSheet.show({
             buttons: [
               { text: '<b>Share</b> This' },
               { text: 'Move' }
             ],
             destructiveText: 'Delete',
             titleText: 'Modify your album',
             cancelText: 'Cancel',
             cancel: function() {
                  // add cancel code..
                },
             buttonClicked: function(index) {
               return true;
             }
           });

           // For example's sake, hide the sheet after two seconds
           $timeout(function() {
             hideSheet();
           }, 2000);

         };

    // A confirm dialog
    $scope.showConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'My BTC Addresss',
     template: '<div class="center"> <img src="http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl=hey" alt="QR Code" style="height: 250px; width:250px;" class="center" /><br>6E7T2GUR3G7T63FDVUGF3GBJHD</div>'
   });
        
   confirmPopup.then(function(res) {
     if(res) {
         $scope.showShare();
       console.log('You are sure');
     } else {
       console.log('You are not sure');
     }
   });
        
       
 };

})

mybccApp.controller('SendReceiveBTCCtrl',function($scope, $ionicPopup, $timeout, $ionicActionSheet) {
    // Triggered on a button click, or some other target
    $scope.showPopup = function() {
      $scope.data = {};

      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template: '<input type="password" ng-model="data.wifi">',
        title: 'Spending Password',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.data.wifi) {
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } else {
                return $scope.data.wifi;
              }
            }
          }
        ]
      });

      myPopup.then(function(res) {
        console.log('Tapped!', res);
      });

      $timeout(function() {
         myPopup.close(); //close the popup after 3 seconds for some reason
      }, 3000);
     };

    
})

mybccApp.controller('RequestBTCCtrl',function($scope) {


    
})

mybccApp.controller('cryptoVaultCtrl',function($scope, $ionicPopup, $timeout, $ionicActionSheet) {
     $scope.showShare = function() {

           // Show the action sheet
           var hideSheet = $ionicActionSheet.show({
             buttons: [
               { text: '<b>Share</b> This' },
               { text: 'Move' }
             ],
             destructiveText: 'Delete',
             titleText: 'Modify your album',
             cancelText: 'Cancel',
             cancel: function() {
                  // add cancel code..
                },
             buttonClicked: function(index) {
               return true;
             }
           });

           // For example's sake, hide the sheet after two seconds
           $timeout(function() {
             hideSheet();
           }, 2000);

         };

    // A confirm dialog
    $scope.showConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'My BTC Addresss',
     template: '<div class="center"> <img src="http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl=hey" alt="QR Code" style="height: 250px; width:250px;" class="center" /><br>6E7T2GUR3G7T63FDVUGF3GBJHD</div>'
   });
        
   confirmPopup.then(function(res) {
     if(res) {
         $scope.showShare();
       console.log('You are sure');
     } else {
       console.log('You are not sure');
     }
   });
        
       
 };
    

})

mybccApp.controller('SendReceiveCryptoCtrl',function($scope, $ionicPopup, $timeout, $ionicActionSheet) {
    // Triggered on a button click, or some other target
    $scope.showPopup = function() {
      $scope.data = {};

      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template: '<input type="password" ng-model="data.wifi">',
        title: 'Spending Password',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.data.wifi) {
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } else {
                return $scope.data.wifi;
              }
            }
          }
        ]
      });

      myPopup.then(function(res) {
        console.log('Tapped!', res);
      });

      $timeout(function() {
         myPopup.close(); //close the popup after 3 seconds for some reason
      }, 3000);
     };

    
})




