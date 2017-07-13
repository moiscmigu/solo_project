function DefaultController($scope, navBarService, SearchItemService, getLocationService) {
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

    $scope.$on('userInfo', function(evt, data) {
        $scope.state = data.state;

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


        // .then(function() {
        //     console.log('sadf', SearchItemService.dbItems);
        //     for (var i = 0; i <  SearchItemService.dbItems.length; i++) {
        //         console.log(SearchItemService.dbItems[i].state );
        //         console.log($scope.state);
        //         if (SearchItemService.dbItems[i].state === $scope.state) {
        //             yesArr.push(SearchItemService.dbItems[i]);
        //         } else {
        //
        //             noArr.push(SearchItemService.dbItems[i]);
        //         }
        //     }
        //     SearchItemService.saveMatches(yesArr, noArr);
        //
        //
        //
        //
        //     });//end of then



        window.location.href ="http://localhost:7138/#!/search";
    };//end of

}//end DefaultController
