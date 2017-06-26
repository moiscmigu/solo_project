console.log('js');

var myApp = angular.module('myApp', []);

myApp.controller('MainController', MainController);


function MainController() {
    var vm = this;
    console.log('inside of MainController');
}
