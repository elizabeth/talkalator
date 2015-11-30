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
            .state('translate', {
                url: '/translate',
                templateUrl: 'views/translate.html',
                controller: 'translateController'
            });
        $urlRouterProvider.otherwise('/');
    })
    .controller('homeController', function($scope, $location) {
        $scope.settings = function() {
            $location.path("settings");
        };
    })
    .controller('settingsController', function($scope, $location) {
        $scope.start = function() {
            $location.path("translate");
        };

    })
    .controller('translateController', function($scope) {
        $scope.begin = function() {
            $("#translate").hide(function() {
                $("#translate").show();
            });
            $("#translatedAudio").hide();
        };

        $scope.translate = function() {
            $("#translatedAudio").show(function() {
                $("#translatedAudio").trigger('play');
            });
        };
    });