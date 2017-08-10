

var myApp = angular.module('myApp', ["ngRoute"]).
controller('DefaultController', DefaultController).
controller('RegisterController', RegisterController).
controller('LoginController', LoginController).
controller('UserProfileController', UserProfileController).
controller('SearchItemController', SearchItemController).
controller('OtherUserController', OtherUserController).
controller('termsAndCondtions', termsAndCondtions);



//
myApp.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl:'views/partials/logIn.html',
        controller:'LoginController'
    }).when('/register', {
        templateUrl:'views/partials/register.html',
        controller:'RegisterController'
    }).when('/login', {
        templateUrl:'views/partials/logIn.html',
        controller:'LoginController'
    }).when('/userProfile/', {
        templateUrl:'views/partials/userProfile.html',
        controller:'UserProfileController as uc'
    }).when('/search', {
        templateUrl:'views/partials/searchItem.html',
        controller:'SearchItemController'
    }).when('/itemSearch', {
        templateUrl:'views/partials/searchUserProfile.html',
        controller:'OtherUserController as oc'
    }).when('/termsAndCondtions', {
        templateUrl:'/views/partials/terms.html',
        controller:'termsAndCondtions'
    });
});//end config
function termsAndCondtions($scope) {
    console.log('in terms and conditions');
    $scope.$emit('changeBackgroundImage', "terms");
    $scope.$emit('toggleHeader', false);
    $scope.$emit('toggleFooter', false);
}
