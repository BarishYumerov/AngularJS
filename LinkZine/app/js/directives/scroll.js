app.directive("scroll", function ($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
            if (this.pageYOffset >= 100) {
                scope.boolChangeClass = true;
                console.log(scope.boolChangeClass)
            } else {
                scope.boolChangeClass = false;
            }
            scope.$apply();
        });
    };
});