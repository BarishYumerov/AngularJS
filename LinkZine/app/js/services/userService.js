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

            changePassword: function(userData, success, error){
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + '/me/changepassword',
                    headers: authService.getAuthHeaders(),
                    data: userData
                };
                $http(request).success(function (data) {
                    success(data);
                }).error(error);
            },

            editUser: function(userData, success, error){
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + '/me',
                    headers: authService.getAuthHeaders(),
                    data: userData
                };
                $http(request).success(function (data) {
                    success(data);
                }).error(error);
            },

            getMyFriends: function(success, error){
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/me/friends',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(function (data) {
                    success(data);
                }).error(error);
            },

            sendFriendRequest: function(username, success, error){
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/me/requests/' + username,
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(function (data) {
                    success(data);
                }).error(error);
            }
        }
    }
);