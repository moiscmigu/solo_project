console.log('js');

var myApp = angular.module('myApp', ["ngRoute"]);

myApp.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrlnp:'views/partials/logIn.html',
        controller:'DefaultController as dc'
    }).when('/register', {
        templateUrl:'views/partials/register.html',
        controller:'RegisterController as rc'
    }).when('/login', {
        templateUrl:'views/partials/logIn.html',
        controller:'LoginController as lc'
    }).when('/userProfile', {
        templateUrl:'views/partials/userProfile.html',
        controller:'UserProfileController as uc'
    });

});//end config

//glo

myApp.controller('DefaultController', DefaultController);
myApp.controller('RegisterController', RegisterController);
myApp.controller('LoginController', LoginController);
myApp.controller('UserProfileController', UserProfileController);

function DefaultController() {
    var vm = this;
    console.log('inside of DefaultController');


}//end DefaultController

function RegisterController(credentialsService) {
    var vm = this;
    console.log('RegisterController');
    vm.register = function() {
        if (vm.firstNameRegister === undefined || vm.lastNameRegister === undefined || vm.emailRegister === undefined || vm.passwordRegister === undefined || vm.zipcode === undefined) {
            sweetAlert({
	               title: "Error!",
                   text: "Something went wrong",
                   type: "error"
               });//end of sweetAlert
        } else if (vm.firstNameRegister === '' || vm.lastNameRegister === '' || vm.emailRegister === '' || vm.passwordRegister === '' || vm.zipcode === null) {
            sweetAlert({
	               title: "Error!",
                   text: "Something went wrong",
                   type: "error"
               });//end of sweetAlert
        } else {
            var userCredentials = {
                firstName:vm.firstNameRegister.toLowerCase(),
                lastName:vm.lastNameRegister.toLowerCase(),
                email:vm.emailRegister,
                password:vm.passwordRegister,
                zipcode:vm.zipcode
            };//end userCredentials

            credentialsService.sendRegister(userCredentials);


        }//end of conditional statement
    };//end register function
}//end register controller



function LoginController(credentialsService) {
    var vm = this;
    console.log('LoginController');
    vm.login = function() {
        if (vm.emailLogin === undefined || vm.passwordLogin === undefined) {
            sweetAlert({
	               title: "Error!",
                   text: "Something went wrong",
                   type: "error"
               });//end of sweetAlert
        }  else {
            var userCredentials = {
                email:vm.emailLogin,
                password:vm.passwordLogin
                };//end userCredentials
            console.log(userCredentials);
            credentialsService.sendLogin(userCredentials).then(function() {
                console.log('back from the service with', credentialsService.response);
                if (credentialsService.response === 'Match!!!') {
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



function UserProfileController() {
    console.log('inside of UserProfileController');
    var vm = this;
    vm.userName = "Moises";
}//end of userProfile
