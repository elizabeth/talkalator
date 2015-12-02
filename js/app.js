angular.module('talkalatorApp', ['ui.router'])
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
        $scope.settings = function() {
            $location.path("settings");
        };
    })
    .controller('settingsController', function($scope, $location, language) {
        $scope.start = function() {
            $location.path("translate");
            language.savedData = $scope.lang;

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
            var audio;
            
            $.ajax({
                url:'../php/translate.php',
                complete: function (response) {
                    audio = response;
                },
                error: function () {
                    $('#output').html('Bummer: there was an error!');
                }
            });


            if ($scope.language == 'Chinese') {
                $('#audio').attr('src', audio);
            } else if ($scope.language == 'Hindi') {
                $('#audio').attr('src', 'http://www.w3schools.com/html/horse.mp3')
            } else if ($scope.language == 'Spanish') {
                $('#audio').attr('src', 'http://www.w3schools.com/html/horse.mp3')
            }
        }

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