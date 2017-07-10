function SearchItemController($scope, SearchItemService) {
    $scope.$emit('toggleHeader', false);
    $scope.userSearch = function() {
        SearchItemService.search().then(function() {
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
                $scope.itemsFromDataBase = SearchItemService.itemsFromDataBase;
            }//end conditinal statements

        }).catch(function(err) {
            console.log('Got an error:', err);
        });//end searchItemService.search
    };//end userProfile

    $scope.goToUserPage = function(index) {
        console.log('index ', index);
        var item = $scope.itemsFromDataBase[index];
        SearchItemService.sendDataToUserPage(item);
        window.location.href ="http://localhost:7138/#!/itemSearch";
    };// end goTo
}//end of controller
