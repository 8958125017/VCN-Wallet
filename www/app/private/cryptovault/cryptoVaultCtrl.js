mybccApp.controller('CryptoVaultCtrl', ['$rootScope', '$scope', '$cordovaClipboard', '$cordovaSocialSharing', '$ionicPopup', '$ionicActionSheet', '$timeout', '$localStorage', 'MyPayService', 'ConnectivityMonitor', 'ionicMaterialInk', function($rootScope, $scope, $cordovaClipboard, $cordovaSocialSharing, $ionicPopup, $ionicActionSheet, $timeout, $localStorage, MyPayService, ConnectivityMonitor, ionicMaterialInk) {

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
  $scope.shareAddress = function(address) {
    console.log("text shareAddress" + address);
    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      buttons: [{
          text: 'whatsapp'
        },
        {
          text: 'facebook'
        },
        {
          text: 'message'
        }
      ],

      titleText: 'Share Address Via',
      cssClass: 'social-actionsheet',
      cancelText: 'Cancel',
      cancel: function() {
        // add cancel code..
      },
      buttonClicked: function(index) {
        if (index === 0) {
          window.plugins.socialsharing.shareViaWhatsApp(address, null /* img */ , null /* url */ , null, function(errormsg) {
            alert("Error: Cannot Share")
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

      }
    });

    // For example's sake, hide the sheet after two seconds
    $timeout(function() {
      hideSheet();
    }, 5000);

  }

  //    // A confirm dialog
  $scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'My VCN Addresss',
      scope: $scope,
      template: '<div class="center"> <img src="http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl={{user.VCNAddress}}" alt="QR Code" style="width: 80%;" ng-click="copyAddress(user.VCNAddress)"></div><div class="center">{{ user.VCNAddress}}<div>',
      okText: 'Share',
    });

    confirmPopup.then(function(res) {
      if (res) {
        $scope.shareAddress($scope.user.userBCHAddress);
        console.log('You are sure');
      } else {
        console.log('You are not sure');
      }
    });
  };



  $scope.copyAddress = function(address) {
    $cordovaClipboard.copy(address).then(function() {
      Materialize.toast('Text Copied !!', 4000);
    }, function() {
      console.error("There was an error copying");
    });
  }



  //remove asks

  $scope.removeAsks = function(askData) {
    if (ConnectivityMonitor.isOffline()) {
      Materialize.toast("internet is disconnected on your device !!", 4000);
    } else {
      $scope.askdata = {
        "askId": askData.id,
        "askownerId": askData.askowner
      }

      MyPayService.removeAskCrypto($scope.askdata).then(function(response) {
        if (response.data.statusCode == 200) {
          $localStorage.credentials.user = response.data.user;
          $rootScope.user = $localStorage.credentials.user;
        } else if (response.data.statusCode >= 400) {
          console.log(response);
          var alertPopup = $ionicPopup.alert({
            title: response.data.message,
          });
        }
      });
    }

  };

  //remove bids

  $scope.removeBids = function(bidsdata) {
    if (ConnectivityMonitor.isOffline()) {
      Materialize.toast("internet is disconnected on your device !!", 4000);
    } else {
      $scope.bidsdata = {
        "bidId": bidsdata.id,
        "bidownerId": bidsdata.bidowner
      }
      MyPayService.removeBidsCrypto($scope.bidsdata).then(function(response) {
        if (response.data.statusCode == 200) {
          $localStorage.credentials.user = response.data.user;
          $rootScope.user = $localStorage.credentials.user;
        } else if (response.data.statusCode >= 400) {
          console.log(response);
          var alertPopup = $ionicPopup.alert({
            title: response.data.message,
          });
        }
      });
    }

  };

}]);
