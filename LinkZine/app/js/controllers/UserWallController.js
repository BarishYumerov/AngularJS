'use strict';

app.controller('UserWallController',
    function($scope, userService, postsService, $rootScope, $location, authService, notifyService){
        if(!sessionStorage.currentUser){
            $location.path("/");
        }
        $(document).on('click', function(){$('#userPreview').remove()});

        $scope.userWallData = JSON.parse(sessionStorage.userWallData);
        $scope.startUserPostId = '';
        $scope.userNewsFeed = [];
        $scope.oldUserScrollPos = 0;
        if(!$scope.userWallData.profileImageData){
            $scope.userWallData.profileImageData = "http://www.balaniinfotech.com/wp-content/themes/balani/images/noimage.jpg"
        }
        if(!$scope.userWallData.coverImageData){
            $scope.userWallData.coverImageData = "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcROgMYL0Q9dKAdRmF0IZK2uUNx_soDPY9VXuiEZCtvSC5WmB5xU"
        }

        $scope.sendFriendRequest = function(username){
            userService.sendFriendRequest(username, function(data){
                    $scope.friendsPreview = data;
                    $scope.userWallData.hasPendingRequest = true;
                    console.log($scope.userWallData);
                },
                function(err){
                    console.log(err);
                })
        };

        $scope.getUserNewsFeed = function() {
            postsService.getUserNewsFeed($scope.userWallData.username, $scope.startUserPostId, function(data){
                    $scope.userNewsFeed = $scope.userNewsFeed.concat(data);
                    $scope.userNewsFeed.forEach(function(post){
                        if(!post.author.profileImageData){
                            post.profileImageData = "http://www.balaniinfotech.com/wp-content/themes/balani/images/noimage.jpg"
                        }
                    })
                    $scope.startUserPostId = data[data.length-1].id;
                },
                function(err){
                    console.log(err);
                })
        };

        $scope.checkUserScroll = function(){
            $(window).scroll(function() {
                if($(window).scrollTop() + $(window).height() + 150 >= $(document).height()) {
                    if($scope.oldUserScrollPos != $(document).height()){
                        $scope.getUserNewsFeed();
                        $scope.oldUserScrollPos = parseInt($(document).height());
                    }
                }
            });
        };

        $scope.getUserPreview = function($event, username){
            userService.getUserPreview(username, function(data){
                $('#userPreview').remove();
                if(!data.profileImageData){
                    data.profileImageData = "http://www.balaniinfotech.com/wp-content/themes/balani/images/noimage.jpg"
                }
                var info = $('<div id="userPreview">' +
                '<img src="' + data.profileImageData + '" width="120px" alt=""/> <p>' + data.name +'</p>' +
                '</div>');
                var gender;
                var btn1;
                if(parseInt(data.gender) == 0){
                    gender = $('<img width="20px" src="http://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Mars_symbol.svg/1024px-Mars_symbol.svg.png"/>')
                }
                else{
                    gender = $('<img width="20px" src="http://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Venus_symbol.svg/1000px-Venus_symbol.svg.png"/>')
                }
                if(data.isFriend){
                    btn1 = $('<button class="btn btn-success btn-xs">Friend</button>')
                }
                else if(data.hasPendingRequest && data.username != $scope.loggedUserData.username){
                    btn1 = $('<button class="btn btn-warning btn-xs">Pending</button>')
                }
                else if(data.username != $scope.loggedUserData.username){
                    btn1 = $('<button class="btn btn-info btn-xs">Invite</button>')
                }
                info.css('left', $event.x);
                info.css('top', $event.y + $(window).scrollTop());
                info.append(gender);
                info.append(btn1);
                $('#userPreview').mouseleave(function(){$('#userPreview').remove()});
                $('body').append(info);
            }, function(err){console.log(err)})
        };

        $scope.likePost = function(postId){
            postsService.likePost(postId, function(data){
                console.log(data);
                var likes = parseInt($('#' + data.postId + ' p').eq(2).html());
                likes = likes + 1;
                $('#' + data.postId + ' p').eq(2).html(likes + ' likes');

            }, function(err){console.log(err)})
        };

        $scope.dislikePost = function(postId){
            postsService.dislikePost(postId, function(data){
                console.log(data);
                var likes = parseInt($('#' + data.postId + ' p').eq(2).html());
                likes = likes - 1;
                $('#' + data.postId + ' p').eq(2).html(likes + ' likes');

            }, function(err){console.log(err)})
        };

        $scope.likeComment = function(postId, commentId){
            postsService.likeComment(postId, commentId, function(data){
                console.log(data);
                var likes = parseInt($('#comment-' + commentId + ' > div p').eq(2).html());
                console.log(likes);
                likes = likes + 1;
                $('#comment-' + commentId + ' p').eq(2).html(likes  + ' likes');

            }, function(err){console.log(err)})
        };

        $scope.dislikeComment = function(postId, commentId){
            postsService.dislikeComment(postId, commentId, function(data){
                console.log(data);
                var likes = parseInt($('#comment-' + commentId + '> div p').eq(2).html());
                likes = likes - 1;
                $('#comment-' + commentId + ' p').eq(2).html(likes  + ' likes');

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
                $scope.getPostComments(postId);
            }, function(err){console.log(err)})
        },

            $scope.getPostComments = function(postId){
                postsService.getPostComments(postId, function(data){
                    $scope.userNewsFeed.forEach(function(post){
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
        };

        $scope.getUserFriendPreview = function(username){
            userService.getUserFriendPreview(username, function(data){
                $scope.userFriendsPreview = data;
            }, function(err){console.log(err)})
        };

        $scope.getUserDetailedFriendlist = function(username){
            userService.getUserDetailedFriendlist(username, function(data){
                console.log(data);
                $scope.userAllFriends = data;
            }, function(err){console.log(err)})
        };

        $scope.postPost = function(username, postContent){
            var data = {
                postContent: postContent,
                username: username
            };
            postsService.postPost(data, function(data){
                console.log(data);
                $scope.userNewsFeed.unshift(data);
                $('#postPostContent').val("");
            }, function(err){
                console.log(err);
            })
        };

        $scope.deletePost = function(postId){
            postsService.deletePost(postId, function(data){
                console.log(data);
                $('#' + postId).remove();
            }, function(err){console.log(err)})
        };

        $scope.showEditPostForm = function(postId){
            $('#' + postId + ' p').eq(1).css('display', 'none');
            $('#editPostForm-' + postId).css('display', 'block');
        };

        $scope.editPost = function(postId, content){
            var data = {
                postContent: content
            };
            postsService.editPost(postId, data, function(data){
                console.log(data);
                $('#editPostForm-' + postId).css('display', 'none');
                $('#postContent-' + postId).css('display', 'block').html(data.content);
            }, function(err){console.log(err)})
        };

        setInterval($scope.checkUserScroll(), 1000);

        if($scope.userWallData.isFriend){
            $scope.userFriendsPreview = $scope.getUserFriendPreview($scope.userWallData.username);
            $scope.userAllFriends = $scope.getUserDetailedFriendlist($scope.userWallData.username);
        }
    }
);