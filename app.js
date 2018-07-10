var app = angular.module('loginForm', [])

//directive to validate phone number
app.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});
app.controller('LoginController',function($scope,$timeout){

	$scope.password_pattern = /^[A-Za-z\d]{4,10}$/;  //pattern to match password of length minimum 4  and maximum 10
	$scope.phonenumber_pattern = /^\+?\d{10}$/; //pattern to match phone number of 10 digits
    $scope.emailId_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/; //pattern to match emailid

    //function to clear the input fields
    $scope.clearInputFields = function(){
    	$scope.user = {};
        $scope.loginSuccessMessage = false; 
    }

    //function to update user details
    $scope.loginUserDetails = function(user){
        console.log("login details-->"+JSON.stringify(user));
        $scope.user = {};
        $scope.validateLoginForm.$setPristine(); //clearing form fields
        $scope.loginSuccessMessage = true;
        $timeout(function(){
            $scope.loginSuccessMessage = false; //showing login success message for 3 seconds
        },3000);
    }
})