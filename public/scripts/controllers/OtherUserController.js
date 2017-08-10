function OtherUserController($scope, credentialsService, AddItemService, SearchItemService, sendMessage ) {
    var vm = this;
        $scope.$emit('toggleHeader', true);

        $scope.showItems = true;
        $scope.popupDiv = false;
        $scope.changeButton = true;
        $scope.myItems = [];




        $scope.getItems = function() {
            credentialsService.getUsers().then(function () {
                AddItemService.getItemsFromDB($scope.userData.email).then(function() {
                    $scope.myItems = [];
                    for (var i = 0; i < AddItemService.itemsResponse.data.length; i++) {
                            if ($scope.userData ===  AddItemService.itemsResponse.data[i].email) {
                                $scope.myItems.push(AddItemService.itemsResponse.data[i]);
                            }//end conditional

                    }//end for loop
                });//end get items from database
            });//end getusers
        };//end getitems


        $scope.showItemInfo = function(index) {
            $scope.itemNameDisplay = $scope.myItems[index].itemName;
            $scope.rentItemDay = $scope.myItems[index].rentDay;
            $scope.rentItemWeek = $scope.myItems[index].rentWeek;
            $scope.rentItemMonth = $scope.myItems[index].rentMonth;
            $scope.rentItemEmail = $scope.myItems[index].email;
            $scope.rentItemPhone = $scope.myItems[index].phone;
            $scope.rentItemDescription = $scope.myItems[index].description;
        };//end showItemInfo

        $scope.revieceData = function(index) {
            SearchItemService.sendDataToUserPage().then(function() {
                $scope.userData = SearchItemService.searchUserData;
                $scope.userImage = SearchItemService.allOfUserData.image;
            });//end of SearchItemService
        };// end goTo


        $scope.sendPhoneMessage = function(index) {
            var message = prompt('Make an offer..');
            var phoneNumber = String($scope.myItems[0].phone);

            sendMessage.sendPhoneMessage(message, phoneNumber);

        };//end of sendPhoneMessage
        $scope.sendEmailMessage = function() {
            console.log('clicked');
            sendMessage.sendEmailMessage();
        };//



}//end of userProfile
