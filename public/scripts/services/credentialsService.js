myApp.service('credentialsService', credentialsService);


function credentialsService($http) {
    console.log('inside of credentialsService');
    var sv = this;


    //registers a new user
    sv.sendRegister = function(data) {
        console.log('inside of sendRegister');
        console.log('service: ', data);

        return $http.post('/register', data).then(function(res) {
            console.log('back from the server with', res);
        });
    };//end of sendRegister\

    //checks to see if user exitst

    sv.sendLogin = function(data) {
        console.log('inside of sendLogin');
        console.log('service: ', data);

        return $http.post('/login', data).then(function(res) {
            console.log('back from the server with', res);
            sv.response = res.data;
            return sv.response;
        });
    };//end of sendRegister
}
