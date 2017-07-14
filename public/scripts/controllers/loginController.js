function LoginController($scope, credentialsService) {
    $scope.$emit('toggleHeader', false);
    $scope.$emit('toggleFooter', false);

    $scope.login = function() {
        if ($scope.emailLogin === undefined || $scope.passwordLogin === undefined) {
            sweetAlert({
	               title: "Error!",
                   text: "Something went wrong",
                   type: "error"
               });//end of sweetAlert
        } else {
            var userCredentials = {
                email:$scope.emailLogin,
                password:$scope.passwordLogin
                };//end userCredentials
                // email = userCredentials.email;
                localStorage.setItem('email', userCredentials.email);
            credentialsService.sendLogin(userCredentials).then(function() {

                if (credentialsService.response === 'Match!!!') {
                    var email = userCredentials.email;

                    credentialsService.getUsers(email);

                    //this should always be at the ennd
                    window.location.href ="http://localhost:7138/#!/userProfile";

                } else {
                    sweetAlert({
        	               title: "Error!",
                           text: "No user found",
                           type: "error"
                       });//end of sweetAlert
                }//end of else
            });//end of then
        }//end of else conditional statement

    };//end log in function
}//end register controller
