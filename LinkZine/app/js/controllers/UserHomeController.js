'use strict';

app.controller('UserHomeController',
    function($scope,$route, $rootScope, $location, userService, searchService, authService, notifyService){
        if(!sessionStorage.currentUser){
            $location.path("/");
        }

        $scope.isActiveSearch = false;
        $scope.isRequestsHovered = false;

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

        $scope.sendFriendRequest = function(username){
            userService.sendFriendRequest(username, function(data){
                    $scope.friendsPreview = data;
                    console.log(data);
                },
                function(err){
                    console.log(err);
                })
        };

        $scope.getFriendRequests = function(){
            $scope.isRequestsHovered = true;
            userService.getFriendRequests(function(data){
                console.log(data);
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
                    $rootScope.reload();
            },
            function(err){
                console.log(err);
            })
        };

        $scope.rejectFriendRequest = function(id){
            userService.rejectFriendRequest(id, function(data){
                    console.log(data);
                },
                function(err){
                    console.log(err);
                })
        };

        $scope.getAllMyFriends = function(){
            userService.getAllMyFriends(function(data){
                $scope.allMyFriends = data;
                console.log($scope.allMyFriends.length);
            },
            function(err){console.log(err)})
        }
    }
);