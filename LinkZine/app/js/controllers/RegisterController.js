'use strict';

app.controller('RegisterController',
    function($scope, $rootScope, $location, authService, notifyService){
        $scope.registerUser = {};
        sessionStorage.clear();
        $scope.register = function(userData) {
            authService.register(userData,
                function success() {
                    $.notify("Profile registration was successful", "success");
                    $location.path("/");
                },
                function error(err) {
                    console.log(err);
                    $.notify(err.message, "error");

                }
            );
        };
    }
);