 mybccApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('tour', {
      cache: false,
      url: '/tour',
      templateUrl: 'app/public/tour/tour.html',
      controller: 'TourCtrl',
       authenticate: false
    })
      .state('userlogin', {
        cache: false,
        url: '/userlogin',
        templateUrl: 'app/public/signIn/login.html',
        controller: 'LoginCtrl',
        authenticate: false
      })

      .state('signup', {
        cache: false,
        url: '/signup',
        templateUrl: 'app/public/signUp/signup.html',
        controller: 'RegistraionCtrl',
        authenticate: false
      })

      .state('forgotPassword', {
        cache: false,
        url: '/forgotPassword',
        templateUrl: 'app/public/forgotPassword/forgotPassword.html',
        controller: 'ForgotPasswordCtrl',
        authenticate: false
      })

      .state('changePassword', {
        cache: false,
        url: '/changePassword',
        templateUrl: 'app/public/forgotPassword/changePassword.html',
        controller: 'ForgotPasswordCtrl',
        authenticate: false
      })   
      .state('app', {
        cache: false,
        url: '/app',
        abstract: true,
        templateUrl: 'app/private/menu.html',
        controller: 'AppCtrl',
        authenticate: true
      })

      .state('app.dashboard', {    
      cache: false,    
        url: '/dashboard',
        views: {
          'menuContent': {
            templateUrl: 'app/private/dashboard/dashboard.html',
            controller: 'DashboardCtrl',
            resolve: {
              getCurrentUserData: function(MyPayService) {
                return MyPayService.getCurrentUserData();
              }
            }
          }
        },
        authenticate: true
      })
  

      
      .state('app.btcvault', {
        cache: false,
        url: '/btcvault',
        views: {
          'menuContent': {
            templateUrl: 'app/private/btcvault/btcvault.html',
            controller: 'BtcVaultCtrl'
          }
        },
        authenticate: true
      })

      .state('app.cryptovault', {
        cache: false,
        url: '/cryptovault',
        views: {
          'menuContent': {
            templateUrl: 'app/private/cryptovault/cryptovault.html',
            controller: 'CryptoVaultCtrl'
          }
        },
        authenticate: true
      })

      .state('app.requestBTC', {
        cache: false,
        url: '/requestBTC',
        views: {
          'menuContent': {
            templateUrl: 'app/private/requestBTC/requestBTC.html',
            controller: 'RequestBTCCtrl'
          }
        },
        authenticate: true
      })

      .state('app.requestcrypto', {
        cache: false,
        url: '/requestcrypto',
        views: {
          'menuContent': {
            templateUrl: 'app/private/requestcrypto/requestcrypto.html',
            controller: 'RequestCryptoCtrl'
          }
        },
        authenticate: true
      })



      .state('app.sendreciveBTC', {
        cache: false,
        url: '/sendreciveBTC',
        views: {
          'menuContent': {
            templateUrl: 'app/private/sendreceiveBTC/sendreceiveBTC.html',
            controller: 'SendReceiveBTCCtrl',
            resolve: {
              getCurrentUserData: function(MyPayService) {
                return MyPayService.getCurrentUserData();
              }
            }
          }
        },
        authenticate: true
      })

      .state('app.sendreceivecrypto', {
        cache: false,
        url: '/sendreceivecrypto',
        views: {
          'menuContent': {
            templateUrl: 'app/private/sendreceivecrypto/sendreceivecrypto.html',
            controller: 'SendReceiveCryptoCtrl',
            resolve: {
              getCurrentUserData: function(MyPayService) {
                return MyPayService.getCurrentUserData();
              }
            }
          }
        },
        authenticate: true
      })

      .state('app.setting', {
        cache: false,
        url: '/setting',
        views: {
          'menuContent': {
            templateUrl: 'app/public/settings/settings.html',
            controller: 'SettingCtrl',
            resolve: {
              getCurrentUserData: function(MyPayService) {
                return MyPayService.getCurrentUserData();
              }
            }
          }
        },
        authenticate: true
      })

       .state('app.changeCurrentPassword', {
        cache: false,
        url: '/changeCurrentPassword',
        views: {
          'menuContent': {
            templateUrl: 'app/public/changeCurrentPassword/changeCurrentPassword.html',
            controller: 'ChangeCurrentPasswordCtrl',
            resolve: {
              getCurrentUserData: function(MyPayService) {
                return MyPayService.getCurrentUserData();
              }
            }
          }
        },
        authenticate: true
      })


      .state('app.changeSpendingPassword', {
        cache: false,
        url: '/changeSpendingPassword',
        views: {
          'menuContent': {
            templateUrl: 'app/public/changeSpendingPassword/changeSpendingPassword.html',
            controller: 'ChangeSpendingPassword',
            resolve: {
              getCurrentUserData: function(MyPayService) {
                return MyPayService.getCurrentUserData();
              }
            }
          }
        },
        authenticate: true
      })


      .state('app.btcsent', {
        cache: false,
        url: '/btcsent',
        views: {
          'menuContent': {
            templateUrl: 'app/private/btctransaction/btcsent.html',
            controller: 'AccountBTCStatementCtrl',
            resolve: {
              getCurrentUserData: function(MyPayService) {
                return MyPayService.getCurrentUserData();
              }
            }
          }
        },
        authenticate: true
      })

      .state('app.btcreceived', {
        cache: false,
        url: '/btcreceived',
        views: {
          'menuContent': {
            templateUrl: 'app/private/btctransaction/btcreceived.html',
            controller: 'AccountBTCStatementCtrl',
            resolve: {
              getCurrentUserData: function(MyPayService) {
                return MyPayService.getCurrentUserData();
              }
            }
          }
        },
        authenticate: true
      })

       .state('app.getCrypto', {
         cache: false,
        url: '/getCrypto',
        views: {
          'menuContent': {
            templateUrl: 'app/private/getCrypto/getCrypto.html',
            controller: 'GetVCNCtrl',
            resolve: {
              getCurrentUserData: function(MyPayService) {
                return MyPayService.getCurrentUserData();
              }
            }
          }
        },
        authenticate: true
      })


      .state('app.bchsent', {
         cache: false,
        url: '/bchsent',
        views: {
          'menuContent': {
            templateUrl: 'app/private/bchtransaction/bchsent.html',
            controller: 'AccountBCHStatementCtrl',
            resolve: {
              getCurrentUserData: function(MyPayService) {
                return MyPayService.getCurrentUserData();
              }
            }
          }
        },
        authenticate: true
      })

      .state('app.bchreceived', {
         cache: false,
        url: '/bchreceived',
        views: {
          'menuContent': {
            templateUrl: 'app/private/bchtransaction/bchreceived.html',
            controller: 'AccountBCHStatementCtrl',
            resolve: {
              getCurrentUserData: function(MyPayService) {
                return MyPayService.getCurrentUserData();
              }
            }
          }
        },
        authenticate: true
      })

        .state('app.buySellTransaction', {
        url: '/buySellTransaction',
        views: {
          'menuContent': {
            templateUrl: 'app/private/bchtransaction/buySellTransaction.html',
            controller: 'AccountBCHStatementCtrl'
          }
        },
        authenticate: true
      })
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/dashboard');
  });
