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
        controller:'UserProfileController as uc'
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



function UserProfileController($scope, credentialsService, AddItemService) {
    var vm = this;
        $scope.$emit('toggleHeader', true);
        $scope.showItems = true;
        $scope.popupDiv = false;
        $scope.changeButton = true;
        $scope.myItems = [];

        $scope.addNewItem = function() {
            console.log('addNewItem clicked');
            $scope.popupDiv = !$scope.popupDiv;

            $scope.showItems = false;
            $scope.changeButton = false;
        };//end addNewItem function

        $scope.submitNewItem = function() {
            console.log('submitNewItem clicked');




            var newItem = {
                itemName:vm.itemName,
                rendDay: vm.rentDay,
                rentWeek: vm.rentWeek ,
                rentMonth:vm.rentMonth,
                email: vm.emailContact,
                phone: vm.phoneContact,
                description: vm.itemDescription
            };//end newItem




            AddItemService.addItemtoDB(newItem).then(function() {
                res = AddItemService.response;
                if (res.status !== Number(200)) {
                } else {

                }//end conditional statement
            }).catch(function(err) {
                console.log('err', err);
            });//end addItemtoDB

            $scope.showItems = true;
            $scope.popupDiv = !$scope.popupDiv;
            $scope.changeButton = true;
        };//end submitNewItem function

        $scope.getItems = function() {
            console.log('inside of get items');
            credentialsService.getUsers().then(function () {
                console.log(credentialsService.userInfo.email);
                AddItemService.getItemsFromDB(credentialsService.userInfo.email).then(function() {
                    $scope.myItems = [];
                    console.log(credentialsService.userInfo.email);

                    for (var i = 0; i < AddItemService.itemsResponse.data.length; i++) {
                            if (credentialsService.userInfo.email ===  AddItemService.itemsResponse.data[i].email) {
                                $scope.myItems.push(AddItemService.itemsResponse.data[i]);
                            }
                    }

                });//end get items from database
            });//end getusers



        };//end getitems


        $scope.cancelNewItem = function() {
            $scope.showItems = true;
            $scope.popupDiv = !$scope.popupDiv;
            $scope.changeButton = true;
        };


        $scope.showItemInfo = function(index) {
            $scope.itemNameDisplay = $scope.myItems[index].itemName;
            $scope.rentItemDay = $scope.myItems[index].rentDay;
            $scope.rentItemWeek = $scope.myItems[index].rentWeek;
            $scope.rentItemMonth = $scope.myItems[index].rentMonth;
            $scope.rentItemEmail = $scope.myItems[index].email;
            $scope.rentItemPhone = $filter('tel')(scope.myItems[index].phone);
            console.log($scope.rentDay);
        };//end showItemInfo


        $scope.userInfo = function() {
            credentialsService.getUsers().then(function () {
                $scope.name = credentialsService.userInfo.firstName;
            });
        };


}//end of userProfile
