'use strict';

app.controller('RegisterController',
    function($scope, $rootScope, $location, authService, notifyService){
        $scope.registerUser = {};
        $scope.profilePictureSelected = function(fileInputField) {
            var file = fileInputField.files[0];
            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function() {
                    $scope.registerUser.profileImageData = reader.result;
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
                    $scope.registerUser.coverImageData = reader.result;
                    $(".coverImage").html("<img src='" + reader.result + "'height=170 width=300>");
                };
                reader.readAsDataURL(file);
            } else {
                $(".image-box").html("<p>File type not supported!</p>");
            }
        };

        $scope.register = function(userData) {
            console.log(userData);
            authService.register(userData,
                function success() {
                    notifyService.showInfo("User registered successfully");
                    $location.path("/");
                },
                function error(err) {
                    notifyService.showError("User registration failed", err);
                }
            );
        };
    }
);