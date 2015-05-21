var app = angular.module('app', ['ngRoute', 'ngResource']);

app.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net/api');

app.config(function ($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: 'partials/GuestHome.html',
        controller: 'GuestHomeController'
    });

    $routeProvider.when('/register', {
        templateUrl: 'partials/Register.html',
        controller: 'RegisterController'
    });

    $routeProvider.when('/login', {
        templateUrl: 'partials/Login.html',
        controller: 'LoginController'
    });

    $routeProvider.otherwise(
        { redirectTo: '/' }
    );

});

app.run(function ($rootScope, $location) {
    $location.path("/");
});
