var app = angular.module("app", ["ngRoute", "chart.js"]);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.

        when('/home', {
            templateUrl: '/partials/home.html',
            controller: 'HomeController'
        }).

        when('/technical', {
            templateUrl: '/partials/technical.htm',
            controller: 'TechnicalController'
        }).
        when('/business', {
            templateUrl: '/partials/business.htm',
            controller: 'BusinessController'
        }).

        otherwise({
            redirectTo: '/home'
        });
}]);

app.controller('HomeController', function ($scope, $http) {
    $http.get('/home').success(function (response) {
        console.log("I got the data requested");
        $scope.filtered_data = response[0];
        $scope.occurences = response[1];
    });

});

app.controller('TechnicalController', function ($scope) {
    $scope.message = "New Technical Controller";

    $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];
});

app.controller('BusinessController', function ($scope) {
    $scope.message = "New Business Controller";
});
