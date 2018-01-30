mybccApp.controller('AppCtrl', function($rootScope, $scope, $ionicLoading, $ionicModal, $timeout, $state, AuthService, $localStorage, $window, $ionicHistory) {
 
  $rootScope.user = $localStorage.credentials;
  $scope.$on('floating-menu:open', function() {});
  $scope.$on('floating-menu:close', function() {

  });
  var queryResult = angular.element(document.querySelector('.title'));
  var wrappedQueryResult = angular.element(queryResult).removeClass('title-left'); 
  $scope.logout = function() {
      $rootScope = {};
    $localStorage.$reset();
    $state.go('userlogin');
  }
})




mybccApp.factory('ConnectivityMonitor', function($rootScope, $cordovaNetwork) {
  return {
    isOnline: function() {
       if (ionic.Platform.isWebView()) {
        return $cordovaNetwork.isOnline();
      } else {
        return navigator.onLine;
      }
    },
    isOffline: function() {
      if (ionic.Platform.isWebView()) {
        return !$cordovaNetwork.isOnline();
      } else {
        return !navigator.onLine;
      }
    },
    startWatching: function() {
      if (ionic.Platform.isWebView()) {

        $rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
          console.log("went online");
        });

        $rootScope.$on('$cordovaNetwork:offline', function(event, networkState) {
          console.log("went offline");
        });

      } else {

        window.addEventListener("online", function(e) {
          console.log("went online");
        }, false);

        window.addEventListener("offline", function(e) {
          console.log("went offline");
        }, false);
      }
    }
  }
})

mybccApp.run(function($ionicPlatform, $ionicLoading, $rootScope, $stateParams, $localStorage, $ionicPopup) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard evoxperience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.overlaysWebView(true);
      StatusBar.style(1);
    }
  });
  $rootScope.cmpBtcAddress = "1HSpKB2Xm4kuiurSeDiiqgqH5Q4p539M4c";
  $rootScope.baseCoin = "VCN";  
  $rootScope.targetCoin = "BTC";  
  $rootScope.appName = "Vcn Wallet";
  $rootScope.baseCoinShortName = "Vc";
  $rootScope.targetCoinShortName ="Ƀ";
  $rootScope.appVersion="Version 1.0.0"; 
})


mybccApp.run(function($rootScope, $state,ConnectivityMonitor, AuthService, $ionicLoading) {
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
    //  if (ConnectivityMonitor.isOffline()) {
    //   var alertPopup = $ionicPopup.alert({
    //     title: "Internet Disconnected",
    //     content: "internet is disconnected on your device."
    //   });
    // }else{     
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
    if (toState.authenticate && !AuthService.isAuthenticated()) {
      $ionicLoading.hide();
      $state.transitionTo("userlogin");
      event.preventDefault();
    }
    if (toState.url == "/userlogin" && AuthService.isAuthenticated()) {
      $state.transitionTo("app.dashboard");
      event.preventDefault();
    }
  //  }
  });

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    $ionicLoading.hide();
  })
})

mybccApp.config(function(ionicDatePickerProvider) {
  var datePickerObj = {
    inputDate: new Date(),
    titleLabel: 'Select a Date',
    setLabel: 'Set',
    closeLabel: 'Close',
    mondayFirst: false,
    weeksList: ["S", "M", "T", "W", "T", "F", "S"],
    monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
    templateType: 'popup',
    from: new Date(2012, 8, 1),
    to: new Date(2018, 8, 1),
    dateFormat: 'dd MMMM yyyy',
    closeOnSelect: false,
    disableWeekdays: []
  };
  ionicDatePickerProvider.configDatePicker(datePickerObj);
})




mybccApp.directive('qrcode', function($interpolate) {
  return {
    restrict: 'E',
    link: function($scope, $element, $attrs) {

      var options = {
        text: '',
        width: 128,
        height: 128,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: 'H'
      };
      Object.keys(options).forEach(function(key) {
        options[key] = $interpolate($attrs[key] || '')($scope) || options[key];
      });
      options.correctLevel = QRCode.CorrectLevel[options.correctLevel];
      new QRCode($element[0], options);
    }
  };
});
mybccApp.directive('decimalPlaces',function(){
    return {
        link:function(scope,ele,attrs){
            ele.bind('keypress',function(e){
                var newVal=$(this).val()+(e.charCode!==0?String.fromCharCode(e.charCode):'');
                if($(this).val().search(/(.*)\.[0-9][0-9][0-9][0-9][0-9]/)===0 && newVal.length>$(this).val().length){
                    e.preventDefault();
                }
            });
        }
    };


});


 //    mybccApp.directive('passwordConfirm', ['$parse', function ($parse) {
 // return {
 //    restrict: 'A',
 //    scope: {
 //      matchTarget: '=',
 //    },
 //    require: 'ngModel',
 //    link: function link(scope, elem, attrs, ctrl) {
 //      var validator = function (value) {
 //        ctrl.$setValidity('match', value === scope.matchTarget);
 //        return value;
 //      }
 
 //      ctrl.$parsers.unshift(validator);
 //      ctrl.$formatters.push(validator);
      
 //      // This is to force validator when the original password gets changed
 //      scope.$watch('matchTarget', function(newval, oldval) {
 //        validator(ctrl.$viewValue);
 //      });

 //    }
 //  };
 //  }]);