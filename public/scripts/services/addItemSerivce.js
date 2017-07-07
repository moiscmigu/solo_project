myApp.service('AddItemService', function($http) {
    var sv = this;
    sv.addItemtoDB = function(item) {
        return $http.post('/newItem', item).then(function(res){
            sv.response = res;
            return sv.response;
        }).catch(function(err) {
            console.log('err', err);
        });//end http call
    };//end of addItemtoDB

    sv.getItemsFromDB = function(data) {
        return $http.get('/newItem/' + data).then(function(res){
            sv.itemsResponse = res;
            return sv.itemsResponse;
        }).catch(function(err) {
            console.log('err', err);
        });//end http call
    };//end of getItemsFromDB
});//end of service
