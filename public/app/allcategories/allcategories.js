'use strict';
angular.module('myAppRename.allcategories', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/allcategories', {
            templateUrl: 'app/allcategories/allcategories.html',
            controller: 'allcategoriesCtrl'
        });
    }])

    .filter('myfilter', function () {

        function strStartsWith(str, prefix) {
            return (str + "").indexOf(prefix) === 0;
        }


        return function (items, letter) {


            var filtered = [];

            angular.forEach(items, function (item) {
                if (strStartsWith(item, letter)) {
                    filtered.push(item);
                }
            });

            return filtered;
        };
    })

    .controller('allcategoriesCtrl', function ($scope, $http) {
        $scope.search = '';
        $scope.findCat = function (letter) {
            $scope.search = letter;
        }
        $http({
            method: 'GET',
            url: 'api/categories'
        }).
            success(function (data, status, headers, config) {
                $scope.wiki = data;
            }).
            error(function (data, status, headers, config) {
                $scope.error = data;
            });

        $scope.alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        $scope.number = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    });
