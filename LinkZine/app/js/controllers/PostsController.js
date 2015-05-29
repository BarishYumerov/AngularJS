'use strict';

app.controller('PostsController',
    function($scope, $rootScope, $location, postsService, authService, userService, notifyService){
        $scope.okSaveScroll = false;
        $(window).on('scroll', function() {
            if ($scope.okSaveScroll) { // false between $routeChangeStart and $routeChangeSuccess
                $scope.scrollPos[$location.path()] = $(window).scrollTop();
                console.log($scope.scrollPos);
            }
        });

        $scope.oldScrollPos = $(document).height();

        $scope.checkScroll = function(){
            $(window).scroll(function() {
                if($(window).scrollTop() + $(window).height() + 150 >= $(document).height()) {
                    if($scope.oldScrollPos != $(document).height()){
                        $scope.getNewsFeed();
                        $scope.oldScrollPos = parseInt($(document).height());
                    }
                }
            });
        };

        setInterval($scope.checkScroll(), 1000);


        $scope.likePost = function(postId){
            postsService.likePost(postId, function(data){
                console.log(data);
                var likes = parseInt($('#' + data.postId + ' p').eq(2).html());
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
        };

        $scope.likeComment = function(postId, commentId){
            postsService.likeComment(postId, commentId, function(data){
                console.log(data);
                var likes = parseInt($('#' + data.commentId + ' p').eq(2).html());
                likes = likes + 1;
                $('#' + data.commentId + ' p').eq(2).html(likes);

            }, function(err){console.log(err)})
        };

        $scope.dislikeComment = function(postId, commentId){
            postsService.dislikeComment(postId, commentId, function(data){
                console.log(data);
                var likes = parseInt($('#' + data.commentId + ' p').eq(2).html());
                likes = likes - 1;
                $('#' + data.commentId + ' p').eq(2).html(likes);

            }, function(err){console.log(err)})
        };

        $scope.showCommentForm = function(postId){
            $('#commentForm-' + postId).css('display','inline')
        };

        $scope.addComment = function(postId, content){
            var data = {
                commentContent: content
            };
            postsService.addComment(postId, data, function(data){
                console.log(data);
                var comments = parseInt($('#' + postId + ' p').eq(3).html());
                comments = comments + 1;
                $('#' + postId + ' p').eq(3).html(comments);
                $('#commentForm-' + postId).css('display','none');
            }, function(err){console.log(err)})
        },

        $scope.getPostComments = function(postId){
            postsService.getPostComments(postId, function(data){
                $scope.newsFeed.forEach(function(post){
                    if(post.id == postId){
                        post.comments = data;
                    }
                });
            }, function(err){console.log(err)})
        };
    }
);