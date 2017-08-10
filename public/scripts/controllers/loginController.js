function LoginController($scope, credentialsService) {
    $scope.$emit('toggleHeader', false);
    $scope.$emit('toggleFooter', false);

    $scope.login = function() {
        var count =0;
        var userLogin = {
            email:$scope.emailLogin,
            password: $scope.passwordLogin,
            terms:$scope.termsAgreement
        };//end of userLogin


        count = parseItem(userLogin);

        if (count === 0) {
            console.log('login in now');
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
                        location.reload("#!/userProfile");
                        window.location.href ="#!/userProfile";

                    } else {
                        sweetAlert({
            	               title: "Error!",
                               text: "No user found",
                               type: "error"
                           });//end of sweetAlert
                    }//end of else
                }).catch(function(err) {
                    if (err) {
                        sweetAlert({
            	               title: "Error!",
                               text: "No user found",
                               type: "error"
                           });//end of sweetAlert
                    }
                });//end of then
        }
    };//end log in function
}//end register controller
