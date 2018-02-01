mybccApp.controller('RequestBTCCtrl', function($rootScope, $scope, $localStorage, MyPayService, $ionicActionSheet, $cordovaSocialSharing, $ionicActionSheet, $timeout, ionicMaterialInk) {

  $rootScope.user = $localStorage.credentials;
  ionicMaterialInk.displayEffect();
  $scope.requestAmountBTC = '';
  $scope.shareBTCRequest = function(address) {
    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      buttons: [{
          text: 'whatsapp'
        },
        // {
        //   text: 'facebook'
        // },
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
        // if (index === 1) {
        //   window.plugins.socialsharing.shareViaFacebook(address, null /* img */ , null /* url */ , null, function(errormsg) {
        //     alert("Error: Cannot Share")
        //   });
        // }
        if (index === 1) {
          window.plugins.socialsharing.shareViaSMS(address, null /* img */ , null /* url */ , null, function(errormsg) {
            alert("Error: Cannot Share")
          });
        }

      }
    });

    // For example's sake, hide the sheet after two seconds
    $timeout(function() {
      hideSheet();
    }, 5000);

  }
});
