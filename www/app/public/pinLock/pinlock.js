mybccApp.controller('PinLockCtrl', function($scope,$rootScope, $state, MyPayService, $ionicPopup) {

$scope.init = function() {
    $scope.passcode = "";
}

$scope.add = function(value) {
    if($scope.passcode.length < 4) {
        $scope.passcode = $scope.passcode + value;
        if($scope.passcode.length == 4) {
            $timeout(function() {
                console.log("The four digit code was entered");
            }, 500);
        }
    }
}


$scope.delete = function() {
    if($scope.passcode.length > 0) {
        $scope.passcode = $scope.passcode.substring(0, $scope.passcode.length - 1);
    }
}

});