'use strict';

app.controller('GuestHomeController',
    function($scope, $rootScope, $location){
        if(sessionStorage.currentUser){
            $location.path('/userHome');
        }
    }
);