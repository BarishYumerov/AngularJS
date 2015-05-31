'use strict';

app.controller('LoginController',
    function($scope, $rootScope, $location, authService, userService, notifyService){
        sessionStorage.clear();
        $scope.login = function(userData) {
            authService.login(userData,
                function success() {
                    $.notify("Login successful", "success");
                    $location.path("/userHome");
                },
                function error(err) {
                    $.notify("Invalid username or password", "error");
                    $location.path("/");
                }
            );
        };
    }
);