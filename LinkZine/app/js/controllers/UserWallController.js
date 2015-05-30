'use strict';

app.controller('UserWallController',
    function($scope, userService, $rootScope, $location, authService, notifyService){
        $scope.userWallData = JSON.parse(sessionStorage.userWallData);
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
    }
);