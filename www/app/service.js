angular.module('mypayservice', [])
  .factory('MyPayService', function($http, $localStorage) {
    function MyPayService() {}


    MyPayService.getCurrentUserData = function() {
      return $localStorage.credentials.user;
    };

    // service for create a new user
    MyPayService.createNewUser = function(user) {
      //console.log(user);
      return $http.post(constants.apiurl + '/user/createNewUser', user, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
           }
      }).then(function(response) {
        var data = response.data;
        return response;
        //console.log(response);
      });
    };

    // service for Login
    MyPayService.loginUser = function(user) {
      return $http.post(constants.apiurl + '/auth/authentcate', user, {
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
      return $http.post(constants.apiurl + '/user/sentOtpToEmailForgotPassword', user, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(function(response) {
        return response;
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

    // service for update Forgot Passord After Verify

    MyPayService.updateForgotPassord = function(user) {
      console.log("user  == = " + angular.toJson(user));
      return $http.post(constants.apiurl + '/user/updateForgotPassordAfterVerify', user, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(function(response) {
        return response;
      });
    };

    // service for update Current Password

    MyPayService.changepasswords = function(passwordValue) {
      //console.log(angular.toJson(passwordValue));
      return $http.post(constants.apiurl + '/user/updateCurrentPassword', passwordValue, {
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

    MyPayService.CurrntBalanceOfBCH = function(emailId) {
      return $http.post(constants.apiurl + '/usertransaction/getBalBCH', emailId, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(function(response) {
       // alert("CurrntBalanceOfBCH = = "+angular.toJson(response));
        return response;
      });
    };
    MyPayService.CurrntBalanceOfBTC = function(emailId) {
      return $http.post(constants.apiurl + '/usertransaction/getBalBTC', emailId, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(function(response) {
         //alert("CurrntBalanceOfBTC = = "+angular.toJson(response));
        return response;
      });
    };

    MyPayService.getBidCoin = function() {
      return $http.post(constants.apiurl + '/cexticker/getCurrntPriceOfBTC', {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        })
        .then(function(response) {
          //alert("getBidCoin = = "+angular.toJson(response));
          return response.data;
        });
    };

    // service for buy BCH Coin By User

    MyPayService.buyBCHCoinByUser = function(buyAmountSend) {
      console.log(angular.toJson(buyAmountSend));
      return $http.post(constants.apiurl + '/usertransaction/buyBCH', buyAmountSend, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(function(response) {
        //console.log("gettting data from server " + angular.toJson(response));
        return response;
        //console.log(response);
      });
    };

    // service for sell(Ask) currency

    MyPayService.sellBCHCoinByUser = function(sellAmount) {
      //console.log(sellAmount);
      return $http.post(constants.apiurl + '/usertransaction/sellBCH', sellAmount, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(function(response) {
        var data = response.data;
        return response;
        //console.log(response);
      });
    };

    //service for send BCH Coin By User

    MyPayService.sendBCHCoinByUser = function(values) {
      //console.log(values);
      return $http.post(constants.apiurl + '/usertransaction/sendBCH', values, {
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
      //console.log(values);
      return $http.post(constants.apiurl + '/usertransaction/sendBTC', values, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(function(response) {
        var data = response.data;
        return response;
        //console.log(response);
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

    // Set New Pin
    MyPayService.setNewPin = function(password) {
      //console.log(password);
      return $http.post('http://localhost:1333/user/changePin', password, {
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        }
      }).then(function(response) {
        var data = response.date;
        return response;
      });
    };

    MyPayService.askCryptoAmount = function(askCryptoAmount) {
      //console.log(askCryptoAmount);
      return $http.post(constants.apiurl + '/ask/addAsk', askCryptoAmount, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(function(response) {
        //console.log("gettting data from server " + angular.toJson(response));
        return response;
        //console.log(response);
      });
    };

    //remove asks

    MyPayService.removeAskCrypto = function(askData) {
      //console.log(askData);
      return $http.post(constants.apiurl + '/ask/removeAsk', askData, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(function(response) {
        //console.log("gettting data from server " + angular.toJson(response));
        return response;
        //console.log(response);
      });
    };

    MyPayService.bidCryptoAmount = function(bidCryptoAmount) {
      //console.log(bidCryptoAmount);
      return $http.post(constants.apiurl + '/bid/addbid', bidCryptoAmount, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(function(response) {
        //console.log("gettting data from server " + angular.toJson(response));
        return response;
        //console.log(response);
      });
    };

    //  remove bids
    MyPayService.removeBidsCrypto = function(bidsdata) {
      //console.log(bidsdata);
      return $http.post(constants.apiurl + '/bid/removeBid', bidsdata, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(function(response) {
        //console.log("gettting data from server " + angular.toJson(response));
        return response;
        //console.log(response);
      });
    };

    MyPayService.OtpToUpdateSpendingPassword = function(currentpasswordValue) {
      //console.log(angular.toJson(spendingpasswordValue));
      return $http.post(constants.apiurl + '/user/sentOtpToUpdateSpendingPassword', currentpasswordValue, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(function(response) {
        return response;
      });
    };

    MyPayService.OtpToEmailForgotSpendingPassord = function(currentpasswordValue) {
      //console.log(angular.toJson(spendingpasswordValue));
      return $http.post(constants.apiurl + '/user/verifyOtpToEmailForgotSpendingPassord', currentpasswordValue, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(function(response) {
        return response;
      });
    };

    MyPayService.setNewSpendingPassord = function(newSpendingPasswordvalue) {
      console.log("user  == = " + angular.toJson(newSpendingPasswordvalue));
      return $http.post(constants.apiurl + '/user/updateForgotSpendingPassordAfterVerify', newSpendingPasswordvalue, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(function(response) {
        return response;
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
