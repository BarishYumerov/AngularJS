'use strict';

app.controller('EditProfileController',
    function($scope, $rootScope, postsService, $location, userService, authService, notifyService){
        $scope.editData = {};

        $scope.profilePictureSelected = function(fileInputField) {
            var file = fileInputField.files[0];
            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function() {
                    $scope.editData.profileImageData = reader.result;
                    $(".profileImage").html("<img src='" + reader.result + "'height=170 width=300>");
                };
                reader.readAsDataURL(file);
            } else {
                $(".image-box").html("<p>File type not supported!</p>");
            }
        };

        $scope.coverImageSelected = function(fileInputField) {
            var file = fileInputField.files[0];
            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function() {
                    $scope.editData.coverImageData = reader.result;
                    $(".coverImage").html("<img src='" + reader.result + "'height=170 width=300>");
                };
                reader.readAsDataURL(file);
            } else {
                $(".image-box").html("<p>File type not supported!</p>");
            }
        };

        $scope.edit = function(userData) {
            userService.editUser(userData,
                function success() {
                    notifyService.showInfo("User profile edited successfully");
                    $location.path("/");
                },
                function error(err) {
                    notifyService.showError("User proifle edit failed", err);
                }
            );
        };
    }
);