function DefaultController($scope, navBarService) {
    console.log('default');
    var vm = this;

    $scope.toggleHeader = true;
    $scope.userNameNav ='';
    //Sharing info with other controllers
    $scope.$on('toggleHeader', function(evt, data) {
        console.log(data);
        $scope.toggleHeader = data;
    });

    $scope.$on('changeName', function(evt, data) {
        $scope.userNameNav = data;
    });


    vm.searchForItem = function() {
        console.log('button clicked');
        console.log(vm.userSearch);
    };

}//end DefaultController
