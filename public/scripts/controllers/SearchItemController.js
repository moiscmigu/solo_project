function SearchItemController($scope, SearchItemService) {
    $scope.$emit('toggleHeader', true);
    $scope.$emit('changeBackgroundImage', "bodySearchItemPage");
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
                window.location.href ="#!/userProfile";
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
            }//end conditinal statements

        }).catch(function(err) {
            console.log('Got an error:', err);
        });//end searchItemService.search
    };//end userProfile

    $scope.goToUserPage = function(index) {
        var item = $scope.match[index];
        SearchItemService.sendDataToUserPage(item);
        window.location.href ="#!/itemSearch";
    };// end goTo


    $scope.goToUserPageNoMatch = function(index) {
        var item = $scope.noMatch[index];
        SearchItemService.sendDataToUserPage(item);
        window.location.href ="#!/itemSearch";
    };


}//end of controller
