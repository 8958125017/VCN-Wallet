angular.module('mypayservice', [])
  .factory('MyPayService', function($http, $localStorage) {
    function MyPayService() {}


    MyPayService.getCurrentUserData = function() {
      return $localStorage.credentials;
    };

    // service for create a new user
    MyPayService.createNewUser = function(user) {
      return $http.post(constants.VcnApiurl + '/user/createNewUser', user, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
           }
      }).then(function(response) {
        var data = response.data;
        return response;
      });
    };

    // service for Login
    MyPayService.loginUser = function(user) {
       console.log("response = = ="+angular.toJson(user));
      return $http.post(constants.VcnApiurl + '/auth/authentcate', user, {
        headers: {
         'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(function(response) {
        return response;
      });
    };

    // service for forgotPassword

    MyPayService.forgotPassword = function(user) {
      console.log("user = = "+angular.toJson(user));
      return $http.post(constants.VcnApiurl + '/user/sentOtpToEmailForgotPassword', user, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(function(response) {
        return response;
      });
    };

     // service for update Forgot Passord After Verify

    MyPayService.updateForgotPassord = function(user) {
      console.log("user  == = " + angular.toJson(user));
      return $http.post(constants.VcnApiurl + '/user/updateforgetpassword', user, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(function(response) {
        return response;
      });
    };


   
    // service for update Current Password

    MyPayService.changepasswords = function(passwordValue) {
      console.log(angular.toJson(passwordValue));
      return $http.post(constants.VcnApiurl + '/user/changepassword', passwordValue, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(function(response) {
        return response;
      });
    };


 MyPayService.setNewSpendingPassord = function(newSpendingPasswordvalue) {
      console.log("user  == = " + angular.toJson(newSpendingPasswordvalue));
      return $http.post(constants.VcnApiurl + '/user/changepin', newSpendingPasswordvalue, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(function(response) {
        return response;
      });
    };

     MyPayService.CurrntBalance = function(emailId) {
        return $http.post(constants.VcnApiurl + '/user/getbalance', emailId, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(function(response) {
          return response;
      });
    };


      //service for send BCH Coin By User

      MyPayService.sendCoinByUser = function(values) {
      console.log("values = = "+angular.toJson(values));
      return $http.post(constants.VcnApiurl + '/user/sendamount', values, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).success(function(response) {
        var data = response.data;
        return response;
        //console.log(response);
      });
    };

    MyPayService.sendBCHCoinByUser = function(values) {
      console.log("values = = "+angular.toJson(values));
      return $http.post(constants.VcnApiurl + '/user/sendamount', values, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).success(function(response) {
        var data = response.data;
        return response;
        //console.log(response);
      });
    };

    //service for send BTC Coin By User

    MyPayService.sendBTCCoinByUser = function(values) {
      console.log("values = = "+angular.toJson(values));
      return $http.post(constants.VcnApiurl + '/user/sendamount', values, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(function(response) {
        var data = response.data;
        return response;        
      });
    };




    MyPayService.getBCHTransactions = function(emailId) {
      return $http.post(constants.apiurl + '/usertransaction/getTxsListBCH', emailId, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(function(response) {
        //console.log(response);
        return response;
        //console.log(response);
      });
    };

    // service for verify Otp To Email ForgotPassord

    MyPayService.VerifyEmail = function(user) {
      return $http.post(constants.apiurl + '/user/verifyOtpToEmailForgotPassord', user, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(function(response) {
        return response;
      });
    };
    
    // service for sent Otp To Email Verificatation

    MyPayService.EmailVerifyforAccount = function(user) {
      return $http.post(constants.apiurl + '/user/sentOtpToEmailVerificatation', user, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(function(response) {
        return response;
      });
    };
    // service for update User Verify Email

    MyPayService.VerificationEmail = function(user) {
      return $http.post(constants.apiurl + '/user/updateUserVerifyEmail', user, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(function(response) {
        return response;
      });
    };

   
    // service for update Spending Password

    MyPayService.changeSpendingpasswords = function(spendingpasswordValue) {
      //console.log(angular.toJson(spendingpasswordValue));
      return $http.post(constants.apiurl + '/user/updateSpendingPassword', spendingpasswordValue, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(function(response) {
        return response;
      });
    };


    MyPayService.emailVerification = function(spendingpasswordValue) {
      //console.log(angular.toJson(spendingpasswordValue));
      return $http.post(constants.apiurl + '/user/updateSpendingPassword', spendingpasswordValue, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(function(response) {
        return response;
      });
    };

   
    MyPayService.getBidCoin = function() {
      return $http.post(constants.VcnApiurl + '/user/getcurrentVCNrate', {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        })
        .then(function(response) {
          //alert("getBidCoin = = "+angular.toJson(response));
          return response.data;
        });
    };


     MyPayService.getVCNprice = function() {
      return $http.post(constants.VcnApiurl + '/user/getexchangerate', {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        })
        .then(function(response) {
          //alert("getBidCoin = = "+angular.toJson(response));
          return response.data;
        });
    };

   



    MyPayService.getBTCTransactions = function(emailId) {
      //console.log(emailId);
      return $http.post(constants.apiurl + '/usertransaction/getTxsListBTC', emailId, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(function(response) {
        //console.log(response);
        return response;
        //console.log(response);
      });
    };











   

     MyPayService.VCNtransactions = function(user) {
      console.log("user  == = " + angular.toJson(user));
      return $http.post(constants.apiurl + '/transaction/requestToConvertBTC', user, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(function(response) {
        return response;
      });
    };

    

    return MyPayService;
  });
