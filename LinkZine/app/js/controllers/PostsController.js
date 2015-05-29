'use strict';

app.controller('PostsController',
    function($scope, $rootScope, $location, postsService, authService, userService, notifyService){

        $scope.getNewsFeed();

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
                var likes = parseInt($('#comment-' + commentId + ' > div p').eq(2).html());
                console.log(likes);
                likes = likes + 1;
                $('#comment-' + commentId + ' p').eq(2).html(likes);

            }, function(err){console.log(err)})
        };

        $scope.dislikeComment = function(postId, commentId){
            postsService.dislikeComment(postId, commentId, function(data){
                console.log(data);
                var likes = parseInt($('#comment-' + commentId + '> div p').eq(2).html());
                likes = likes - 1;
                $('#comment-' + commentId + ' p').eq(2).html(likes);

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

        $scope.deleteComment = function(postId, commentId){
            postsService.deleteComment(postId, commentId, function(data){
                console.log(data);
                var comments = parseInt($('#' + postId + ' p').eq(3).html());
                comments = comments - 1;
                $('#' + postId + ' p').eq(3).html(comments);
                $('#comment-' + commentId).remove();
            }, function(err){console.log(err)})
        };

        $scope.showEditCommentForm = function(commentId){
            $('#comment-' + commentId + ' > div p').eq(1).css('display', 'none');
            $('#editCommentForm-' + commentId).css('display', 'block');
        };

        $scope.editComment = function(postId, commentId, content){
            var data = {
                commentContent: content
            };
            postsService.editComment(postId, commentId, data, function(data){
                console.log(data);
                $('#editCommentForm-' + commentId).css('display', 'none');
                $('#comment-' + commentId + ' > div p').eq(1).css('display', 'block').html(data.commentContent);
            }, function(err){console.log(err)})
        }
    }
);