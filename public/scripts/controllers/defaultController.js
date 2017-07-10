function DefaultController($scope, navBarService, SearchItemService) {
    console.log('default');
    var vm = this;

    $scope.toggleHeader = true;
    $scope.userNameNav ='';
    //Sharing info with other controllers
    $scope.$on('toggleHeader', function(evt, data) {
        $scope.toggleHeader = data;
    });

    $scope.$on('changeName', function(evt, data) {
        $scope.userNameNav = data;
    });


    vm.searchForItem = function() {
        SearchItemService.search(vm.userSearch);
        window.location.href ="http://localhost:7138/#!/search";
    };

}//end DefaultController
