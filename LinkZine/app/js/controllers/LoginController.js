'use strict';

app.controller('LoginController',
    function($scope, $rootScope, $location, authService, userService, notifyService){
        sessionStorage.clear();
        $scope.login = function(userData) {
            authService.login(userData,
                function success() {
                    notifyService.showInfo("Login successful");
                    $location.path("/userHome");
                },
                function error(err) {
                    notifyService.showError("Login failed", err);
                }
            );
        };
    }
);