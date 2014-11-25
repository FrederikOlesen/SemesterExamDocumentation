'use strict';

angular.module('myAppRename.search', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/search', {
            templateUrl: 'app/view3/search.html',
            controller: 'SearchCtrl'
        });
    }])

    .controller('SearchCtrl', function ($scope, $http) {
        $http({
            method: 'GET',
            url: 'api/articles/'
        }).
            success(function (data, status, headers, config) {
                $scope.wiki = data;
            }).
            error(function (data, status, headers, config) {
                $scope.error = data;
            });
    });



