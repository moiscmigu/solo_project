function UserProfileController($scope, credentialsService, AddItemService, SearchItemService) {
    var vm = this;
        $scope.$emit('toggleHeader', true);
        $scope.$emit('toggleFooter', true);
        $scope.$emit('changeBackgroundImage', "bodyUserPage");

        $scope.showItems = true;
        $scope.popupDiv = false;
        $scope.changeButton = true;
        $scope.myItems = [];





        $scope.addNewItem = function() {
            $scope.popupDiv = !$scope.popupDiv;

            $scope.showItems = false;
            $scope.changeButton = false;
        };//end addNewItem function

        var client = filestack.init('AQEH2W4M2RJq6V56D1Ntyz');
        $scope.showPicker = function() {
            client.pick({
            }).then(function(result) {
                $scope.imgUrl = result.filesUploaded[0].url;
            });
        };


        $scope.submitNewItem = function() {
            credentialsService.getUsers().then(function () {
                $scope.sendUserEmail = credentialsService.userInfo.email;
                $scope.sendUserZipcode = credentialsService.userInfo.zipcode;
                $scope.sendUserState =credentialsService.userInfo.state;
                $scope.sendUserCity =credentialsService.userInfo.city;
                $scope.sendUserPhone =credentialsService.userInfo.phone;

                var newItem = {
                    itemName:vm.itemName,
                    rentDay: vm.rentDay,
                    rentWeek: vm.rentWeek ,
                    rentMonth:vm.rentMonth,
                    email: $scope.sendUserEmail,
                    description: vm.itemDescription,
                    zipcode:$scope.sendUserZipcode,
                    state:$scope.sendUserState,
                    city: $scope.sendUserCity,
                    phone: $scope.sendUserPhone,
                    image:$scope.imgUrl

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

        $scope.userInfo = function() {
            credentialsService.getUsers().then(function () {
                $scope.userName = credentialsService.userInfo.firstName;
                $scope.userImage = credentialsService.userInfo.image;
                $scope.$emit('userInfo', credentialsService.userInfo);

            });//end credentialsService
        };//end user info function



        $scope.deleteItem = function(index) {
            var itemId = $scope.myItems[index]._id;
            SearchItemService.deleteItem(itemId);

        };//end of deleteItem
}//end of userProfile
