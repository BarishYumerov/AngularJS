'use strict';

app.factory('searchService',
    function ($http, baseServiceUrl, authService) {
        return {
            getUsersByName: function (name, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/users/search?searchTerm=' + name,
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(function (data) {
                    sessionStorage.loggedUser = JSON.stringify(data);
                    success(data);
                }).error(error);
            }
        }
    }
);