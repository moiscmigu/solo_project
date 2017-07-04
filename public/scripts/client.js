console.log('js');

var myApp = angular.module('myApp', ["ngRoute"]);

myApp.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrlnp:'',
        controller:'DefaultController'
    }).when('/register', {
        templateUrl:'views/partials/register.html',
        controller:'RegisterController'
    }).when('/login', {
        templateUrl:'views/partials/logIn.html',
        controller:'LoginController'
    }).when('/userProfile', {
        templateUrl:'views/partials/userProfile.html',
        controller:'UserProfileController'
    });

});//end config

//global variables

myApp.controller('DefaultController', DefaultController);
myApp.controller('RegisterController', RegisterController);
myApp.controller('LoginController', LoginController);
myApp.controller('UserProfileController', UserProfileController);

localStorage.setItem('email', 'sdfsdfds');

function DefaultController($scope, navBarService) {

    console.log('inside of DefaultController');

    $scope.toggleHeader = true;

    $scope.$on('toggleHeader', function(evt, data) {
        $scope.toggleHeader = data;
    });



}//end DefaultController

function RegisterController( $scope, credentialsService) {
    $scope.$emit('toggleHeader', false);

    console.log('RegisterController');
    $scope.register = function() {
        if ($scope.firstNameRegister === undefined || $scope.lastNameRegister === undefined || $scope.emailRegister === undefined || $scope.passwordRegister === undefined || $scope.zipcode === undefined) {
            sweetAlert({
	               title: "Error!",
                   text: "Something went wrong",
                   type: "error"
               });//end of sweetAlert
        } else if ($scope.firstNameRegister === '' || $scope.lastNameRegister === '' || $scope.emailRegister === '' || $scope.passwordRegister === '' || $scope.zipcode === null) {
            sweetAlert({
	               title: "Error!",
                   text: "Something went wrong",
                   type: "error"
               });//end of sweetAlert
        } else {
            var userCredentials = {
                firstName:$scope.firstNameRegister.toLowerCase(),
                lastName:$scope.lastNameRegister.toLowerCase(),
                email:$scope.emailRegister,
                password:$scope.passwordRegister,
                zipcode:$scope.zipcode
            };//end userCredentials

            credentialsService.sendRegister(userCredentials);
        }//end of conditional statement
    };//end register function


}//end register controller



function LoginController($scope, credentialsService) {

    console.log('LoginController');
    $scope.$emit('toggleHeader', false);

    $scope.login = function() {
        if ($scope.emailLogin === undefined || $scope.passwordLogin === undefined) {
            sweetAlert({
	               title: "Error!",
                   text: "Something went wrong",
                   type: "error"
               });//end of sweetAlert
        }  else {
            var userCredentials = {
                email:$scope.emailLogin,
                password:$scope.passwordLogin
                };//end userCredentials
                // email = userCredentials.email;
                localStorage.setItem('email', userCredentials.email);
            credentialsService.sendLogin(userCredentials).then(function() {

                if (credentialsService.response === 'Match!!!') {
                    var email = userCredentials.email;

                    credentialsService.getUsers(email);

                    //this should always be at the ennd
                    window.location.replace("http://localhost:7138/#!/userProfile");

                } else {
                    sweetAlert({
        	               title: "Error!",
                           text: "No user found",
                           type: "error"
                       });//end of sweetAlert
                }//end of else
            });//end of then
        }//end of else conditional statement

    };//end log in function
}//end register controller



function UserProfileController($scope, credentialsService) {
    console.log('inside of UserProfileController');
        $scope.$emit('toggleHeader', true);




        $scope.userInfo = function() {
            credentialsService.getUsers().then(function () {
                console.log(credentialsService.userInfo);
                $scope.name = credentialsService.userInfo.firstName;
            });
        };


}//end of userProfile
