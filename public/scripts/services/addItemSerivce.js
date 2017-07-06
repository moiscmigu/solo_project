myApp.service('AddItemService', function($http) {
    console.log('in my service');

    var sv = this;
    sv.addItemtoDB = function(item) {
        console.log(item);
        return $http.post('/newItem', item).then(function(res){
            console.log('back from the server with ', res);
            sv.response = res;
            return sv.response;
        }).catch(function(err) {
            console.log('err', err);
        });//end http call
    };//end of addItemtoDB

    sv.getItemsFromDB = function(data) {
        console.log('inside of getItemsFromDB');
        console.log('data', data);
        return $http.get('/newItem/' + data).then(function(res){
            console.log('back from the server with ', res);
            sv.itemsResponse = res;
            return sv.itemsResponse;
        }).catch(function(err) {
            console.log('err', err);
        });//end http call
    };




});//end of service
