function UserProfileController($scope, credentialsService, AddItemService, SearchItemService, $route) {
    var vm = this;

    $scope.$emit('toggleHeader', true);
    $scope.$emit('toggleFooter', false);
    $scope.$emit('changeBackgroundImage', "bodyUserPage");

    $scope.showItems = true;
    $scope.popupDiv = false;
    $scope.changeButton = true;
    $scope.myItems = [];
    $scope.showMyModal = 'none';
    $scope.showMyEditModal = 'none';

    $scope.hideMyModal = function () {
        $scope.showItems = true;
        $scope.popupDiv = !$scope.popupDiv;
        $scope.changeButton = true;
    };//end of hideMyModal

    $scope.toggleEditModal = function() {
        $scope.showMyEditModal = 'none';
    };

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
    };//end of show picker

    $scope.submitNewItem = function() {
        credentialsService.getUsers().then(function () {
            $scope.showMyModal = 'block';
            var count = 0;
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

            //makes sure item is  filled out
            count = parseItem(newItem);

            //checks to see if parseItem returns a count of 0
            if (count === 0) {
                AddItemService.addItemtoDB(newItem).then(function() {
                res = AddItemService.response;
                if (res.status !== Number(200)) {
                } else {
                }//end conditional statement
            }).catch(function(err) {
                console.log('err', err);
            });//end addItemtoDB
            $scope.showItems = true;
            $scope.changeButton = true;
             $scope.showMyModal = 'none';

        }//end of conditional count == 0
        });//end credentialsService.getUsers()
        return $scope.showMyModal;
    };//end submitNewItem function

    $scope.getItems = function() {
        $scope.userInfo();
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
        $scope.getItems();
    };//end of deleteItem

    //if item is edited, delete current item and add this as a new one
    $scope.editItem = function(index) {
        console.log(index);
        $scope.itemToDelete = index;
        console.log($scope.myItems[index].image);
        $scope.editItemName = $scope.myItems[index].itemName;
        $scope.editItemImage = $scope.myItems[index].image;
        $scope.editItemPricePerDay = $scope.myItems[index].rentDay;
        $scope.editItemPricePerWeek = $scope.myItems[index].rentWeek;
        $scope.editItemPricePerMonth = $scope.myItems[index].rentMonth;
        $scope.editItemDescription = $scope.myItems[index].description;
        $scope.showMyEditModal = 'block';
    };

    $scope.submitNewEditedItem = function() {
        credentialsService.getUsers().then(function () {
            $scope.sendUserEmail = credentialsService.userInfo.email;
            $scope.sendUserZipcode = credentialsService.userInfo.zipcode;
            $scope.sendUserState =credentialsService.userInfo.state;
            $scope.sendUserCity =credentialsService.userInfo.city;
            $scope.sendUserPhone =credentialsService.userInfo.phone;

            var newItem = {
                itemName:$scope.editItemName,
                rentDay: $scope.editItemPricePerDay,
                rentWeek: $scope.editItemPricePerWeek ,
                rentMonth:$scope.editItemPricePerMonth,
                email: $scope.sendUserEmail,
                description: $scope.editItemDescription,
                zipcode:$scope.sendUserZipcode,
                state:$scope.sendUserState,
                city: $scope.sendUserCity,
                phone: $scope.sendUserPhone,
                image:$scope.editItemImage
            };//end newItem

            //makes sures the item has everything filled out
            var count = parseItem(newItem);

            if (count === 0) {
                console.log('asdfasd');
                $scope.deleteItem($scope.itemToDelete);
                AddItemService.addItemtoDB(newItem).then(function() {
                    res = AddItemService.response;
                    if (res.status !== Number(200)) {

                    } else {
                    }//end conditional statement
                }).catch(function(err) {
                    console.log('err', err);
                });//end addItemtoDB
                $scope.showItems = true;
                $scope.changeButton = true;
                $scope.getItems();
                $scope.showMyEditModal = 'none';
                return $scope.showMyEditModal;
            }//end if count==0
        });//end credentialsService.getUsers()
    };//end of submitNewEditedItem
}//end of userProfile


function parseItem(object) {
    var count = 0;
    for (var x in object) {
        if (object.hasOwnProperty(x)) {
            if (object[x] === undefined ||object[x] === '' ) {
                if (x == 'image') {
                    swal({
                      title: 'Error',
                      text: 'Please please submit an image',
                      type :'error'
                    });
                    count++;
                } else if (x == 'email') {
                    swal({
                      title: 'Error',
                      text: 'Please please Enter a valid email',
                      type :'error'
                    });
                    count++;
                }
                else {
                    swal({
                      title: 'Error',
                      text: 'Please please fill out the ' + x,
                      type :'error'
                    });
                    count++;
                }//end of else
            }//end of if
        }//end of hasitem
    }//end of for loop
    return count;
} //end of funtion
