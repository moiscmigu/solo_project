function UserProfileController($scope, credentialsService, AddItemService) {
    var vm = this;
        $scope.$emit('toggleHeader', true);

        $scope.showItems = true;
        $scope.popupDiv = false;
        $scope.changeButton = true;
        $scope.myItems = [];

        $scope.addNewItem = function() {
            $scope.popupDiv = !$scope.popupDiv;

            $scope.showItems = false;
            $scope.changeButton = false;
        };//end addNewItem function

        $scope.submitNewItem = function() {
            credentialsService.getUsers().then(function () {
                $scope.sendUserEmail = credentialsService.userInfo.email;
                var newItem = {
                    itemName:vm.itemName,
                    rentDay: vm.rentDay,
                    rentWeek: vm.rentWeek ,
                    rentMonth:vm.rentMonth,
                    email: $scope.sendUserEmail,
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
            });//end credentialsService.getUsers()

            $scope.showItems = true;
            $scope.popupDiv = !$scope.popupDiv;
            $scope.changeButton = true;
        };//end submitNewItem function

        $scope.getItems = function() {
            credentialsService.getUsers().then(function () {
                AddItemService.getItemsFromDB(credentialsService.userInfo.email).then(function() {
                    $scope.myItems = [];

                    for (var i = 0; i < AddItemService.itemsResponse.data.length; i++) {
                            if (credentialsService.userInfo.email ===  AddItemService.itemsResponse.data[i].email) {
                                $scope.myItems.push(AddItemService.itemsResponse.data[i]);
                            }//end conditional
                    }//end for loop
                });//end get items from database
            });//end getusers
        };//end getitems

        $scope.cancelNewItem = function() {
            $scope.showItems = true;
            $scope.popupDiv = !$scope.popupDiv;
            $scope.changeButton = true;
        };//end cancelNewItem

        $scope.showItemInfo = function(index) {
            $scope.itemNameDisplay = $scope.myItems[index].itemName;
            $scope.rentItemDay = $scope.myItems[index].rentDay;
            $scope.rentItemWeek = $scope.myItems[index].rentWeek;
            $scope.rentItemMonth = $scope.myItems[index].rentMonth;
            $scope.rentItemEmail = $scope.myItems[index].email;
            $scope.rentItemPhone = $scope.myItems[index].phone;
            $scope.rentItemDescription = $scope.myItems[index].description;
        };//end showItemInfo

        $scope.userInfo = function() {
            credentialsService.getUsers().then(function () {
                $scope.name = credentialsService.userInfo.firstName;
                $scope.$emit('changeName', $scope.name);
            });//end credentialsService
        };//end user info function
}//end of userProfile