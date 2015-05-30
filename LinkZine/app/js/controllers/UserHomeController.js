'use strict';

app.controller('UserHomeController',
    function($scope,$route, $rootScope,postsService, $location, userService, searchService, authService, notifyService){
        if(!sessionStorage.currentUser){
            $location.path("/");
        }

        $scope.isActiveSearch = false;
        $scope.isRequestsHovered = false;
        $scope.startPostId = '';
        $scope.newsFeed = [];
        $scope.userWallData = {};

        userService.getUserData(function(data){
            $scope.loggedUserData = data;
            $scope.friendsPreview = $scope.getMyFriends();
            $scope.allMyFriends = $scope.getAllMyFriends();
            },
            function(err){
                console.log(err)
            }
        );

        $scope.logout = function () {
            authService.logout(function(){
                notifyService.showInfo("Logout successful");
                $location.path("/");
            }, function(err){
                notifyService.showError("Logout failed", err);
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
                console.log(data);
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
                var info = $('<div id="userPreview">' +
                '<img src="' + data.profileImageData + '" alt=""/> <p>' + data.name +'</p>' +
                '</div>');
                var btn1
                if(data.isFriend){
                    btn1 = $('<button class="btn btn-success btn-xs">Friend</button>')
                }
                else if(data.hasPendingRequest){
                    btn1 = $('<button class="btn btn-warning btn-xs">Pending</button>')
                }
                else{
                    btn1 = $('<button class="btn btn-info btn-xs">Invite</button>')
                }
                info.css('left', $event.x);
                info.css('top', $event.y + $(window).scrollTop());
                info.append(btn1);
                $('body').append(info);
            }, function(err){console.log(err)})
        };

        $scope.logData = function(user){
            console.log(user);
        }
    }
);