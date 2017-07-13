myApp.service('getLocationService', function($http) {
    var sv = this;

    sv.getCordinates = function(zipcode) {
        console.log('in cordinates', zipcode);
        return $http.get('http://ziplocate.us/api/v1/' + zipcode).then(function(res) {
            sv.cordinates = res.data;
        });//end of get call
    };
});//end of service
