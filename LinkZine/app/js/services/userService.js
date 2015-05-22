'use strict';

app.factory('userService',
    function ($http, baseServiceUrl, authService) {
        return {
            getUserData: function (success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/me',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(function (data) {
                    sessionStorage.loggedUser = JSON.stringify(data);
                    success(data);
                }).error(error);
            },

            changePassword: function(password, success, error){
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + '/me/changepassword',
                    headers: authService.getAuthHeaders(),
                    data: password
                };
                $http(request).success(function (data) {
                    success(data);
                }).error(error);
            }
        }
    }
);