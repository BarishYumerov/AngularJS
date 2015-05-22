'use strict';

app.controller('UserHomeController',
    function($scope, $rootScope, $location, userService, searchService, authService, notifyService){
        if(!sessionStorage.currentUser){
            $location.path("/");
        }

        $scope.isActiveSearch = false;

        userService.getUserData(function(data){
            $scope.loggedUserData = data;
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
            $('#searchResults').empty();
            if($('#inputSearch').val() == ''){
                $scope.isActiveSearch = false;
                if($('#inputSearch')){
                    $(document).remove($('#inputSearch'));
                }
                return;
            }
            searchService.getUsersByName(name, function(data){
                $scope.searchResults = data;
                if($('#inputSearch')){
                    $(document).remove($('#inputSearch'));
                }
                data.forEach(function(person){
                    $scope.addSeachPerson(person)
                });
            },
            function(err){
                console.log(err);
            })
        };

        $scope.addSeachPerson = function(person){
            var result = $('<div class="resultPerson">');
            var profileImg = $('<img src="' + person.profileImageData +'"/>');
            var name = $('<p>').html(person.name);
            result.append(profileImg)
                .append(name);

            $('#searchResults').append(result);
        }
    }
);