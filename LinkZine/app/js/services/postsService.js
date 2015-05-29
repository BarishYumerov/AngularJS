'use strict';

app.factory('postsService',
    function ($http, baseServiceUrl, authService) {
        return {
            getNewsFeed: function (startPostId, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/me/feed?StartPostId='+ (startPostId || '' ) + '&PageSize=5',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(function (data) {
                    success(data);
                }).error(error);
            },

            likePost: function(postId, success, error){
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/Posts/' + postId + '/likes',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(function (data) {
                    success(data);
                }).error(error);
            },

            dislikePost: function(postId, success, error){
                var request = {
                    method: 'DELETE',
                    url: baseServiceUrl + '/Posts/' + postId + '/likes',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(function (data) {
                    success(data);
                }).error(error);
            },

            likeComment: function(postId, commentId, success, error){
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/posts/' + postId + '/comments/ ' +commentId + '/likes',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(function (data) {
                    success(data);
                }).error(error);
            },

            dislikeComment: function(postId, commentId, success, error){
                var request = {
                    method: 'DELETE',
                    url: baseServiceUrl + '/posts/' + postId + '/comments/ ' +commentId + '/likes',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(function (data) {
                    success(data);
                }).error(error);
            }
        }
    }
);