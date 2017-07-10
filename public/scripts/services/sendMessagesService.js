myApp.service('sendMessage', function($http) {
    console.log('inside of service');
    var sv = this;
    sv.sendEmailMessage = function(from , to) {
        console.log('from', from );
        console.log('to', to);
        var emails = {
            to:to,
            from:from
        };
        console.log('inside of sendEmailMessage');
        return $http.post('/sendMessage', emails).then(function(res) {
            console.log('back from the server with', res);
        });//end of http.post
    };//end of sendEmailMessage
});//end of service
