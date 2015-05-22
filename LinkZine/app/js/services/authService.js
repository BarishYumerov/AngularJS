'use strict';

app.factory('authService',
    function ($http, baseServiceUrl) {
        return {
            login: function (userData, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/users/login',
                    data: userData
                };
                $http(request).success(function (data) {
                    sessionStorage['currentUser'] = JSON.stringify(data);
                    success(data);
                }).error(error);
            },

            register: function (userData, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/users/register',
                    data: userData
                };
                $http(request).success(function (data) {
                    sessionStorage['currentUser'] = JSON.stringify(data);
                    success(data);
                }).error(error);
            },

            logout: function(success, error){
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/users/logout',
                    headers: this.getAuthHeaders()
                };
                $http(request).success(function (data) {
                    sessionStorage.clear();
                    success(data);
                }).error(error);
            },

            getCurrentUser : function() {
                var userObject = sessionStorage['currentUser'];
                if (userObject) {
                    return JSON.parse(sessionStorage['currentUser']);
                }
            },

            getAuthHeaders : function() {
                var headers = {};
                var currentUser = this.getCurrentUser();
                if (currentUser) {
                    headers['Authorization'] = 'Bearer ' + currentUser.access_token;
                }
                return headers;
            }
        }
    }
);