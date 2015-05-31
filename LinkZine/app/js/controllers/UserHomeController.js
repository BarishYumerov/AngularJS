'use strict';

app.controller('UserHomeController',
    function($scope,$route, $rootScope,postsService, $location, userService, searchService, authService, notifyService){
        if(!sessionStorage.currentUser){
            $location.path("/");
        }

        $(document).on('click', function(){$('#userPreview').remove()});

        $scope.isActiveSearch = false;
        $scope.isRequestsHovered = false;
        $scope.startPostId = '';
        $scope.newsFeed = [];
        $scope.userWallData = {};

        userService.getUserData(function(data){
            $scope.loggedUserData = data;
            $scope.friendsPreview = $scope.getMyFriends();
            $scope.allMyFriends = $scope.getAllMyFriends();
            $scope.friendRequestPreview = $scope.getFriendRequests();
            },
            function(err){
                console.log(err)
            }
        );

        $scope.logout = function () {
            authService.logout(function(){
                $.notify("Logout was successful", "success");
                $location.path("/");
            }, function(err){
            })
        };

        $scope.searchByName = function(name){
            $scope.isActiveSearch = true;
            if($('#inputSearch').val() == ''){
                if($('#searchResults')){
                    $(document).remove($('#searchResults'));
                }
                $scope.isActiveSearch = false;
                return;
            }
            searchService.getUsersByName(name, function(data){
                    data.forEach(function(user){
                        if(!user.profileImageData){
                            user.profileImageData = 'http://www.balaniinfotech.com/wp-content/themes/balani/images/noimage.jpg';
                        }
                    });

                    console.log(data);
                    $scope.searchResults = data;

            },
            function(err){
                console.log(err);
            })
        };


        $scope.changePassword = function(passwrd){
            userService.changePassword(passwrd, function(data){
                    console.log(data);
                    $.notify("Password change was successful", "success");
                },
                function(err){
                    console.log(err)
                })
        };

        $scope.getMyFriends = function(){
            userService.getMyFriends(function(data){
                    $scope.friendsPreview = data;
                },
                function(err){
                    console.log(err)
                })
        };

        $scope.getFriendRequests = function(){
            $scope.isRequestsHovered = true;
            userService.getFriendRequests(function(data){
                $scope.requestResults = data;
            },
            function(err){
                console.log(err);
            })
        };

        $scope.overFriendRefusts = function(){
            $scope.isRequestsHovered = false;
        };

        $scope.acceptFriendRequest = function(id){
            userService.acceptFriendRequest(id, function(data){
                console.log(data);
                    $scope.friendsPreview.totalCount++;
                    $('#' + id).remove();
            },
            function(err){
                console.log(err);
            })
        };

        $scope.rejectFriendRequest = function(id){
            userService.rejectFriendRequest(id, function(data){
                    console.log(data);
                    $('#' + id).remove();
                },
                function(err){
                    console.log(err);
                })
        };

        $scope.getAllMyFriends = function(){
            userService.getAllMyFriends(function(data){
                $scope.allMyFriends = data;
            },
            function(err){console.log(err)})
        };

        $scope.getNewsFeed = function() {
            postsService.getNewsFeed($scope.startPostId, function(data){
                    $scope.newsFeed = $scope.newsFeed.concat(data);
                    $scope.startPostId = data[data.length-1].id;
                },
                function(err){
                    console.log(err);
                })
        };

        $scope.getUserFullData = function(username){
            userService.getUserFullData(username, function(data){
                $scope.userWallData = data;
                sessionStorage.userWallData = JSON.stringify(data);
                $location.path("/users/" + data.username);
            }, function(err){console.log(err)});
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
                console.log(data);
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

        $scope.deletePost = function(postId){
            postsService.deletePost(postId, function(data){
                console.log(data);
                $('#' + postId).remove();
            }, function(err){console.log(err)})
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

        $scope.logData = function(user){
            console.log(user);
        }
    }
);