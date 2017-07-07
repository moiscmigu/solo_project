myApp.service('credentialsService', credentialsService);


function credentialsService($http) {
    var sv = this;
    sv.userEmail = String;

    //registers a new user
    sv.sendRegister = function(data) {

        console.log();
        return $http.post('/register', data).then(function(res) {
        });
    };//end of sendRegister\

    //checks to see if user exitst

    sv.sendLogin = function(data) {


        return $http.post('/login', data).then(function(res) {

            sv.response = res.data;
            return sv.response;
        });
    };//end of sendRegister

    sv.getUsers = function (data){

        if(data === undefined) {
            return $http.get('/login/' +localStorage.getItem('userData')).then(function(res) {
                sv.userInfo = res.data;
                return sv.userInfo;
            });//end of http get call
        }
        else {

        console.log(data);
        return $http.get('/login/' + data).then(function(res) {
            sv.userInfo = res.data;
            localStorage.setItem('userData', data);
            return sv.userInfo;
        });//end of http get call
        }

    };//end of sv.getUsers


}//end of service
