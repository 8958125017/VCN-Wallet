mybccApp.controller('RequestBTCCtrl', function($rootScope, $scope, $localStorage, MyPayService, $ionicActionSheet, $cordovaSocialSharing, $ionicActionSheet, $timeout,ionicMaterialInk) {
  $scope.userBTCAddress = $localStorage.credentials.user;
  $rootScope.user = $localStorage.credentials.user;
  ionicMaterialInk.displayEffect();
  $scope.requestAmountBTC = "0";
  $scope.shareBTCRequest = function(address) {   
    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      buttons: [{
          text: 'whatsapp'
        },
        {
          text: 'facebook'
        },
        {
          text: 'Message'
        }

      ],
      titleText: 'Share address Via',
      cssClass: 'social-actionsheet',
      cancelText: 'Cancel',
      cancel: function() {
        // add cancel code..
      },
      buttonClicked: function(index) {
        if (index === 0) {
          window.plugins.socialsharing.shareViaWhatsApp(address, null /* img */ , null /* url */ , null, function(errormsg) {
            alert("Error: Cannot Share");
          });
        }
        if (index === 1) {
          window.plugins.socialsharing.shareViaFacebook(address, null /* img */ , null /* url */ , null, function(errormsg) {
            alert("Error: Cannot Share")
          });
        }
        if (index === 2) {
          window.plugins.socialsharing.shareViaSMS(address, null /* img */ , null /* url */ , null, function(errormsg) {
            alert("Error: Cannot Share")
          });
        }
        //   if (index === 3) {
        //   window.plugins.socialsharing.shareViaEmail(address, subject, toArr, ccArr, bccArr, file, null, function(errormsg) {
        //     alert("Error: Cannot Share")
        //   });
        // }
      }
    });

    // For example's sake, hide the sheet after two seconds
    $timeout(function() {
      hideSheet();
    }, 5000);

  }
});
