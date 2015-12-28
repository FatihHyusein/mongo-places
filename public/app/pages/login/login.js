'use strict';

angular.module('boxing.login', ['ui.router'])

    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider
                .when('/login/:id', '/logins/:id')
                .when('/logins/:id', '/logins/:id')
                .when('/register', '/register');

            $stateProvider
                .state('logins', {
                    url: 'logins',
                    templateUrl: 'app/pages/login/login.html',
                    controller: 'LoginCtrl'
                })

                .state('register', {
                    url: 'register',
                    templateUrl: 'app/pages/login/register.html',
                    controller: 'RegisterCtrl'
                });
        }])

    .controller('LoginCtrl', ['$rootScope', '$scope', 'Login', '$state',
        function ($rootScope, $scope, Login, $state) {
            $scope.login = function () {
                Login.create({},
                    $.param({
                        username: $scope.username,
                        password: $scope.password
                    }), successLogin, failLogin
                );

                function successLogin(response) {
                    localStorage.setItem("authToken", response.token);
                    localStorage.setItem("userId", response.id);
                    $rootScope.loggedInUser = true;
                    $state.go('home');
                }

                function failLogin(response) {
                }
            };
        }])

    .controller('RegisterCtrl', ['$rootScope', '$scope', 'User', '$state',
        function ($rootScope, $scope, User, $state) {
            $scope.newUserData = {};
            $scope.register = function () {

                User.create({},
                    $.param($scope.newUserData), successRegister, failRegister
                );

                function successRegister(response) {
                    $state.go('logins');
                }

                function failRegister(response) {
                }
            };
        }]);