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


        count = loginCheck(userLogin);

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
                        location.reload("http://localhost:7138/#!/userProfile");
                        window.location.href ="http://localhost:7138/#!/userProfile";

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


function loginCheck(object) {
    console.log('inside of loginCheck');
    var count = 0;
    for(var x in object) {
        if(object.hasOwnProperty(x))
            if (object[x] === undefined || object[x] === "") {
                if (x === 'email') {
                    sweetAlert({
                              title: "Alert!",
                              text: "Please enter valid email",
                              type: "error"
                          });//end of sweetAlert
                    count ++;
                } else if (x == "terms" ) {
                if (x === 'terms') {
                    sweetAlert({
                              title: "Alert!",
                              text: "Please agree to terms",
                              type: "error"
                          });//end of sweetAlert
                    count ++;
                }
            }
                else {
                    sweetAlert({
                              title: "Alert!",
                              text: "Please enter " +  x,
                              type: "error"
                          });//end of sweetAlert
                    count ++;
                }
            }//end of if userCredentials is undefined or empty string
        }// end of  for loop`
        return count;
}//end of function
