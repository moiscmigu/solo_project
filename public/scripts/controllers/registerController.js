function RegisterController( $scope, credentialsService) {
    $scope.$emit('toggleHeader', false);
    console.log('RegisterController');
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
                   text: "Something went wrong",
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
                phone:$scope.phoneRegister
            };//end userCredentials
            credentialsService.sendRegister(userCredentials);
        }//end of conditional statement
    };//end register function


}//end register controller
