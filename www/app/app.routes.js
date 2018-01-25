 mybccApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('tour', {
      url: '/tour',
      templateUrl: 'app/public/tour/tour.html',
      controller: 'TourCtrl',
       authenticate: false
    })
      .state('userlogin', {
        url: '/userlogin',
        templateUrl: 'app/public/signIn/login.html',
        controller: 'LoginCtrl',
        authenticate: false
      })

      .state('signup', {
        url: '/signup',
        templateUrl: 'app/public/signUp/signup.html',
        controller: 'RegistraionCtrl',
        authenticate: false
      })

      .state('forgotPassword', {
        url: '/forgotPassword',
        templateUrl: 'app/public/forgotPassword/forgotPassword.html',
        controller: 'ForgotPasswordCtrl',
        authenticate: false
      })

      .state('changePassword', {
        url: '/changePassword',
        templateUrl: 'app/public/forgotPassword/changePassword.html',
        controller: 'ForgotPasswordCtrl',
        authenticate: false
      })
      .state('pinlock', {
        url: '/pinlock',
        templateUrl: 'app/public/pinlock/pinlock.html',
        controller: 'PinLockCtrl',
        authenticate: false
      })
      

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'app/private/menu.html',
        controller: 'AppCtrl',
        authenticate: true
      })

      .state('app.dashboard', {
        url: '/dashboard',
        views: {
          'menuContent': {
            templateUrl: 'app/private/dashboard/dashboard.html',
            controller: 'DashboardCtrl'
          }
        },
        authenticate: true
      })
      .state('app.about', {
        url: '/about',
        views: {
          'menuContent': {
            templateUrl: 'app/public/about/about.html',
            controller: 'AboutCtrl'
          }
        },
        authenticate: true
      })

      .state('app.buycrypto', {
        url: '/buycrypto',
        views: {
          'menuContent': {
            templateUrl: 'app/private/buycrypto/buycrypto.html',
            controller: 'BuyCryptoCtrl',
            resolve: {
              currentPriceOfBTC: function(MyPayService) {
                return MyPayService.getBidCoin();
              }
            }
          }
        },
        authenticate: true
      })

      .state('app.sellcrypto', {
        url: '/sellcrypto',
        views: {
          'menuContent': {
            templateUrl: 'app/private/sellcrypto/sellcrypto.html',
            controller: 'SellCryptoCtrl',
            resolve: {
              currentPriceOfBTC: function(MyPayService) {
                return MyPayService.getBidCoin();
              }
            }
          }
        },
        authenticate: true
      })

      .state('app.askcrypto', {
        url: '/askcrypto',
        views: {
          'menuContent': {
            templateUrl: 'app/private/askcrypto/askcrypto.html',
            controller: 'AskCryptoCtrl',
            resolve: {
              currentPriceOfBTC: function(MyPayService) {
                return MyPayService.getBidCoin();
              }
            }
          }
        },
        authenticate: true
      })

      .state('app.bidcrypto', {
        url: '/bidcrypto',
        views: {
          'menuContent': {
            templateUrl: 'app/private/bidcrypto/bidcrypto.html',
            controller: 'BidCryptoCtrl',
            resolve: {
              currentPriceOfBTC: function(MyPayService) {
                return MyPayService.getBidCoin();
              }
            }
          }
        },
        authenticate: true
      })



      .state('app.btcvault', {
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
        url: '/btcsent',
        views: {
          'menuContent': {
            templateUrl: 'app/private/btctransaction/btcsent.html',
            controller: 'AccountBTCStatementCtrl'
          }
        },
        authenticate: true
      })

      .state('app.btcreceived', {
        url: '/btcreceived',
        views: {
          'menuContent': {
            templateUrl: 'app/private/btctransaction/btcreceived.html',
            controller: 'AccountBTCStatementCtrl'
          }
        },
        authenticate: true
      })

       .state('app.getCrypto', {
        url: '/getCrypto',
        views: {
          'menuContent': {
            templateUrl: 'app/private/getCrypto/getCrypto.html',
            controller: 'GetVCNCtrl'
          }
        },
        authenticate: true
      })


          .state('app.depositeBTC', {
        url: '/depositeBTC',
        views: {
          'menuContent': {
            templateUrl: 'app/private/depositeBTC/depositeBTC.html',
            controller: 'DepositeBTCCtrl'
          }
        },
        authenticate: true
      })


      .state('app.bchsent', {
        url: '/bchsent',
        views: {
          'menuContent': {
            templateUrl: 'app/private/bchtransaction/bchsent.html',
            controller: 'AccountBCHStatementCtrl'
          }
        },
        authenticate: true
      })
      .state('app.bchreceived', {
        url: '/bchreceived',
        views: {
          'menuContent': {
            templateUrl: 'app/private/bchtransaction/bchreceived.html',
            controller: 'AccountBCHStatementCtrl'
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
