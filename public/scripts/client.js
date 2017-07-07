
var myApp = angular.module('myApp', ["ngRoute"]).
controller('DefaultController', DefaultController).
controller('RegisterController', RegisterController).
controller('LoginController', LoginController).
controller('UserProfileController', UserProfileController);



//
myApp.config(function($routeProvider) {
    $routeProvider.when('/', {
        template:'',
        controller:'DefaultController as dc'
    }).when('/register', {
        templateUrl:'views/partials/register.html',
        controller:'RegisterController'
    }).when('/login', {
        templateUrl:'views/partials/logIn.html',
        controller:'LoginController'
    }).when('/userProfile', {
        templateUrl:'views/partials/userProfile.html',
        controller:'UserProfileController as uc'
    });
});//end config
