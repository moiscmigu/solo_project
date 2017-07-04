myApp.service('navBarService', function() {
    console.log('inside of navBarService');
    var sv = this;
    sv.toggleHeader = function(data) {
        console.log('inside of toggleHeader');
        console.log(data);
    };//end of toggleHeader

    
});// end of service
