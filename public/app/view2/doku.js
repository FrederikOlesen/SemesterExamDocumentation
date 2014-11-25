'use strict';

angular.module('myAppRename.doku', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/doku', {
            templateUrl: 'app/view2/doku.html',
            controller: 'View2Ctrl'
        });
    }])

    .controller('View2Ctrl', ['$scope', 'InfoFactory', 'InfoService', function ($scope, InfoFactory, InfoService) {
        $scope.infoFactory = InfoFactory.getInfo();
        $scope.infoService = InfoService.getInfo();
    }]);
