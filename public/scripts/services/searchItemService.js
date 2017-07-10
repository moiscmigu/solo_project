myApp.service('SearchItemService', function($http) {
    var sv = this;

    sv.search = function(data) {
        if (data === undefined) {
            console.log('item searched', localStorage.getItem('itemSearched'));
            var item = localStorage.getItem('itemSearched');
            return $http.get('/searchItem/' + item).then(function(res) {
                console.log('back from the server with', res);
                sv.itemsFromDataBase = res.data;
                sv.itemSearched = item;
            });//end of promise
        }
        else {
            localStorage.setItem('itemSearched', data);
        }//end of conditional statemenets
    };//end of sv.search

    sv.sendDataToUserPage = function(data) {
        if (data === undefined) {
            return $http.get('/login/' + localStorage.getItem('user')).then(function(res) {
                console.log('BACK FROM THE SERVER WITH', res);
                sv.searchUserData = res.data;
            });//end of http get call

        }// end of if conditional statement
        else {
            localStorage.setItem('user', data.email);
        }//end else conditional statement
    };//end of sendDataToUserPage

});//end of controller
