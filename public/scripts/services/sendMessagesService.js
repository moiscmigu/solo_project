myApp.service('sendMessage', function($http) {
    console.log('inside of service');
    var sv = this;
    sv.sendPhoneMessage = function(message, phoneNumber) {
        var emails = {
            to:'phoneNumber',
            body:message
        };
        console.log('inside of sendEmailMessage');
        return $http.post('/sendMessage', emails).then(function(res) {
            console.log('back from the server with', res);
        });//end of http.post
    };//end of sendEmailMessage


    sv.sendEmailMessage = function() {
        console.log('in sendEmailMessage');
        var email = 'moisesmigueledu@gmail.com';
        $http.post('/sendEmailMessage', email).then(function(res) {
            console.log('back from the server with', res);
        });//end of http call
    };
});//end of service
