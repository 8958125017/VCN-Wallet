// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var mybccApp = angular.module('starter', ['ionic', 'ngCordova', 'ionic-material', 'ionic-datepicker', 'blocIoAppFront.authService',
    'ion-digit-keyboard', 'ionic.contrib.drawer', 'mypayservice', 'ngStorage'
  ])

  .run(function($ionicPlatform, $ionicPopup,$location) {
    $ionicPlatform.ready(function() {

      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {        
            StatusBar.backgroundColorByHexString("#00F2E2");        
      }
       var firstVisit = localStorage.getItem('firstVisit');
          if (!firstVisit) {
            $location.url('/tour');
      }
      var con = window.Connection;
      if (window.Connection) {
        if (navigator.connection.type == Connection.NONE) {
             Materialize.toast("internet is disconnected on your device !!",4000);   
        }
      }
    });
  })
