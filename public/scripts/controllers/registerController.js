function RegisterController( $scope, credentialsService) {
    $scope.$emit('toggleHeader', false);
    $scope.$emit('toggleFooter', false);
    var client = filestack.init('AQEH2W4M2RJq6V56D1Ntyz');
    $scope.showPicker = function() {
        client.pick({
        }).then(function(result) {
            console.log(result.filesUploaded[0].url);
            $scope.imgUrl = result.filesUploaded[0].url;
        });
    };

    $scope.register = function() {

        var userCredentials = {
            firstName:$scope.firstNameRegister,
            lastName:$scope.lastNameRegister,
            email:$scope.emailRegister,
            password:$scope.passwordRegister,
            zipcode:$scope.zipcode,
            state:$scope.state,
            city:$scope.city,
            phone:$scope.phoneRegister,
            image:$scope.imgUrl
        };//end userCredentials

        var undefinedCount = 0;

        for(var x in userCredentials) {
            if(userCredentials.hasOwnProperty(x))
                if (userCredentials[x] === undefined || userCredentials[x] === '') {
                    if (x === 'email') {
                        if (userCredentials[x] === undefined) {

                            swal({
                              title: 'Error',
                              text: 'Please please fill out valid Email',
                              type :'error'
                            });
                            undefinedCount++;
                        }
                    }//end of if x is email
                    else {
                        swal({
                          title: 'Error',
                          text: 'Please please fill out ' + x,
                          type :'error'
                        });
                        undefinedCount++;
                    }//end of else
                }//end of if userCredentials is undefined or empty string
            }// end of  for loop

            //runs once everthing is properly filled out
            if (undefinedCount == 0) {
                credentialsService.sendRegister(userCredentials);
                swal({
                  title: 'Success',
                  text: 'User Created',
                  type :'success'
                });
                window.location.href ="http://localhost:7138/#!/login";
            }
    };//end register function
}//end register controller
