'use strict';

app.controller('UserHomeController',
    function($scope, $rootScope, $location, userService, searchService, authService, notifyService){
        if(!sessionStorage.currentUser){
            $location.path("/");
        }

        $scope.isActiveSearch = false;

        userService.getUserData(function(data){
            $scope.loggedUserData = data;
            $scope.friendsPreview = $scope.getMyFriends();
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
                    console.log(data);
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
            console.log('sending request');
            userService.sendFriendRequest(username, function(data){
                    $scope.friendsPreview = data;
                    console.log(data);
                },
                function(err){
                    console.log(err);
                })
        }
    }
);