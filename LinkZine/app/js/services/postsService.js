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
            },

            addComment: function(postId, content, success, error){
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/posts/' + postId + '/comments',
                    headers: authService.getAuthHeaders(),
                    data: content
                };
                $http(request).success(function (data) {
                    success(data);
                }).error(error);
            },

            getPostComments: function(postId, success, error){
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/posts/' + postId + '/comments',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(function (data) {
                    success(data);
                }).error(error);
            },

            deleteComment: function(postId, commentId, success, error){
                var request = {
                    method: 'DELETE',
                    url: baseServiceUrl + '/posts/' + postId + '/comments/ ' +commentId,
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(function (data) {
                    success(data);
                }).error(error);
            },

            editComment: function(postId, commentId, data, success, error){
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + '/posts/' + postId + '/comments/ ' +commentId,
                    headers: authService.getAuthHeaders(),
                    data: data
                };
                $http(request).success(function (data) {
                    success(data);
                }).error(error);
            },

            getUserNewsFeed: function (username, startPostId, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/users/' + username + '/wall?StartPostId= ' + startPostId + ' &PageSize=5',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(function (data) {
                    success(data);
                }).error(error);
            },

            postPost: function(data, success, error){
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/posts',
                    headers: authService.getAuthHeaders(),
                    data: data
                };
                $http(request).success(function (data) {
                    success(data);
                }).error(error);
            },

            deletePost: function(postId, success, error){
                var request = {
                    method: 'DELETE',
                    url: baseServiceUrl + '/Posts/' + postId,
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(function (data) {
                    success(data);
                }).error(error);
            }
        }
    }
);