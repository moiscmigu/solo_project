function RegisterController( $scope, credentialsService) {
    $scope.$emit('toggleHeader', false);
    var client = filestack.init('AQEH2W4M2RJq6V56D1Ntyz');
    $scope.showPicker = function() {
        client.pick({
        }).then(function(result) {
            console.log(result.filesUploaded[0].url);
            $scope.imgUrl = result.filesUploaded[0].url;
        });
    };

    $scope.register = function() {
        if ($scope.firstNameRegister === undefined || $scope.lastNameRegister === undefined || $scope.emailRegister === undefined || $scope.passwordRegister === undefined || $scope.zipcode === undefined) {
            sweetAlert({
	               title: "Error!",
                   text: "Something went wrong",
                   type: "error"
               });//end of sweetAlert
        } else if ($scope.firstNameRegister === '' || $scope.lastNameRegister === '' || $scope.emailRegister === '' || $scope.passwordRegister === '' || $scope.zipcode === null) {
            sweetAlert({
	               title: "Error!",
                   text: "Registration Unsuccesful",
                   type: "error"
               });//end of sweetAlert
        } else {
            var userCredentials = {
                firstName:$scope.firstNameRegister.toLowerCase(),
                lastName:$scope.lastNameRegister.toLowerCase(),
                email:$scope.emailRegister,
                password:$scope.passwordRegister,
                zipcode:$scope.zipcode,
                state:$scope.state.toLowerCase(),
                city:$scope.city.toLowerCase(),
                phone:$scope.phoneRegister,
                image:$scope.imgUrl
            };//end userCredentials
            console.log('userCredentials', userCredentials);
            credentialsService.sendRegister(userCredentials);
        }//end of conditional statement
    };//end register function
}//end register controller
