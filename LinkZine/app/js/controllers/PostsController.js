'use strict';

app.controller('PostsController',
    function($scope, $rootScope, $location, postsService, authService, userService, notifyService){
        $scope.likePost = function(postId){
            postsService.likePost(postId, function(data){
                console.log(data);
                var likes = parseInt($('#' + data.postId + ' p').eq(2).html());
                $('#' + data.postId + ' a').eq(0)
                likes = likes + 1;
                $('#' + data.postId + ' p').eq(2).html(likes);

            }, function(err){console.log(err)})
        };

        $scope.dislikePost = function(postId){
            postsService.dislikePost(postId, function(data){
                console.log(data);
                var likes = parseInt($('#' + data.postId + ' p').eq(2).html());
                likes = likes - 1;
                $('#' + data.postId + ' p').eq(2).html(likes);

            }, function(err){console.log(err)})
        }
    }
);