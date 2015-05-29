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


        $scope.checkScroll = function(){
            $(window).scroll(function() {
                if($(window).scrollTop() + $(window).height() + 150 >= $(document).height()) {
                    $scope.getNewsFeed();
                }
            });
            setTimeout(null, 2000)
        };

        setInterval($scope.checkScroll(), 100);


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
    }
);