angular.module('talkalatorApp', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        'use strict'; //strict mode

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'views/home.html',
                controller: 'homeController'
            })
            .state('settings', {
                url: '/settings',
                templateUrl: 'views/settings.html',
                controller: 'settingsController'
            })
            .state('start', {
                url: '/',
                templateUrl: 'views/start.html',
                controller: 'startController'
            });
        $urlRouterProvider.otherwise('/');
    })
    .controller('homeController', function($scope, $location) {
        $scope.settings = function() {
            $location.path("settings");
        };
    })
    .controller('settingsController', function() {
        //do nothing

    })
    .controller('startController', function() {
        //do nothing
    });