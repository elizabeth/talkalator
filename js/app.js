angular.module('syncApp', ['ui.router'])
    .factory('language', function() {
        var savedData = null;

        return {
            savedData: savedData
        }
    })
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
        $("#detected").delay(5000).queue(function() {
            $(this).html("Sync earpiece detected");
            $("#begin").show();
        });

        $scope.settings = function() {
            $location.path("settings");
        };
    })
    .controller('settingsController', function($scope, $location, language) {
        $scope.start = function() {
            $location.path("translate");
            language.savedData = $scope.lang;
        };

        $scope.go = function() {
            $location.path("translate");
        };

        if (!$scope.lang) {
            $scope.lang = 'Chinese';
        }
    })
    .controller('translateController', function($scope, language) {
        if (language.savedData) {
            $scope.language = language.savedData;
            setAudio()
        } else {
            $scope.language = 'Chinese';
            setAudio()
        }

        function setAudio() {
            var url = 'http://api.voicerss.org/?key=0939b85175fb460b9d6da343211d2cd3&r=-4&src=';
            if ($scope.language == 'Chinese') {
                $('#audio').attr('src', url + '嗨，你好吗&hl=zh-cn');
            } else if ($scope.language == 'Hindi') {
                $('#audio').attr('src', url + 'hi%20how%20are%20you&hl=zh-cn');
            } else if ($scope.language == 'Spanish') {
                $('#audio').attr('src', url + 'hola%20como%20estas&hl=es-mx');
            }
        }

        $scope.begin = function() {
            $("#translate").hide(function() {
                $("#translate").show();
            });
            $("#translatedAudio").hide();
        };

        $scope.translate = function() {
            $("#translate").hide(function() {
                $("#translatedAudio").show(function() {
                    $("#translatedAudio").trigger('play');
                });
            });
        };

    });