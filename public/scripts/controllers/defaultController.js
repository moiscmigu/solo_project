function DefaultController($scope, navBarService, SearchItemService, getLocationService) {
    var vm = this;



    $scope.class = "bodyOne";

    $scope.toggleFooter = true;
    $scope.$on('userInfo', function(evt, data) {
        $scope.state = data.state;
        $scope.backgroundImage = data;

    });

    $scope.toggleHeader = true;
    $scope.userNameNav ='';
    //Sharing info with other controllers
    $scope.$on('toggleHeader', function(evt, data) {
        $scope.toggleHeader = data;
    });

    $scope.$on('toggleFooter', function(evt, data) {
        $scope.toggleFooter = data;
    });

    $scope.$on('changeName', function(evt, data) {
        $scope.userNameNav = data;
    });

    $scope.$on('changeBackgroundImage', function(evt, data) {
        console.log('should change the background image with this url', data);
        $scope.class = data;
    });



    vm.searchForItem = function() {
        console.log('the va;ue;',vm.selectValue);
        console.log('zipcode', $scope.zipcode);
        var noArr = [];
        var yesArr = [];

        var objectToSend = {
            state:$scope.state,
            item:vm.userSearch
        };

        SearchItemService.search(objectToSend);
        window.location.href ="#!/search";
    };//end of

}//end DefaultController
