function SearchItemController($scope, SearchItemService) {
    $scope.$emit('toggleHeader', true);
    $scope.match = [];
    $scope.noMatch = [];




    $scope.userSearch = function() {
        SearchItemService.search().then(function() {
            $scope.match = [];
            $scope.noMatch = [];
            if (SearchItemService.itemsFromDataBase.length == 0) {
                sweetAlert({
                       title: "Error!",
                       text: "No items found",
                       type: "error"
                   });//end of sweetAlert
                window.location.href ="http://localhost:7138/#!/userProfile";
            }
            else{

                $scope.ItemSearched = SearchItemService.itemSearched;
                for (var i = 0; i < SearchItemService.itemsFromDataBase.length; i++) {

                    if (SearchItemService.itemsFromDataBase[i].state === SearchItemService.state) {


                        $scope.match.push(SearchItemService.itemsFromDataBase[i]);
                    }
                    else {

                         $scope.noMatch.push(SearchItemService.itemsFromDataBase[i]);
                    }
                }//end of for loop
                console.log($scope.noMatch);
            }//end conditinal statements

        }).catch(function(err) {
            console.log('Got an error:', err);
        });//end searchItemService.search
    };//end userProfile

    $scope.goToUserPage = function(index) {
        console.log('index ', index);
        var item = $scope.match[index];
        console.log(item);
        SearchItemService.sendDataToUserPage(item);
        window.location.href ="http://localhost:7138/#!/itemSearch";
    };// end goTo


    $scope.goToUserPageNoMatch = function(index) {
        console.log('index ', index);
        var item = $scope.noMatch[index];
        SearchItemService.sendDataToUserPage(item);
        window.location.href ="http://localhost:7138/#!/itemSearch";
    };


}//end of controller
