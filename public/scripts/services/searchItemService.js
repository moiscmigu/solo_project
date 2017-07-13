myApp.service('SearchItemService', function($http) {
    var sv = this;

    sv.search = function(data) {
        if (data === undefined) {
            console.log('item searched', localStorage.getItem('itemSearched'));
            var item = localStorage.getItem('itemSearched');
            return $http.get('/searchItem/' + item).then(function(res) {
                sv.itemsFromDataBase = res.data;
                sv.itemSearched = item;
                sv.state = localStorage.getItem('state');
            });//end of promise
        }
        else {
            console.log('not saved');
            console.log('asdfasdfasd',data.item);
            localStorage.setItem('itemSearched', data.item);
            localStorage.setItem('state', data.state);
        }//end of conditional statemenets
    };//end of sv.search

    sv.sendDataToUserPage = function(data) {
        if (data === undefined) {
            return $http.get('/login/' + localStorage.getItem('user')).then(function(res) {
                console.log('BACK FROM THE SERVER WITH', res);
                sv.searchUserData = localStorage.getItem('user');
            });//end of http get call

        }// end of if conditional statement
        else {
            localStorage.setItem('user', data.email);

        }//end else conditional statement
    };//end of sendDataToUserPage

    sv.saveMatches = function(match, noMatch) {
        if (match === undefined && noMatch === undefined) {
            console.log('not saved');
        }
        else {
            console.log('saved');
        }
    };//end saveMatches

    sv.deleteItem = function(itemId) {
        console.log('about to delete item', itemId);
        $http.delete('/searchItem/' + itemId).then(function(res) {
            console.log('back from the server with', res);
        });//end of delete http call
    };//end of deleteItem

});//end of controller
