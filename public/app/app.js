'use strict';

var MongoPlacesApp = angular.module('mongoPlaces', [
        'ui.router',
        'ngAnimate',
        'ngResource',
        'ui.bootstrap',
        'mongoPlaces.login',
        'mongoPlaces.users',
        'mongoPlaces.pois',
        'gmapsModule'
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$resourceProvider',
        function ($stateProvider, $urlRouterProvider, $resourceProvider) {
            $resourceProvider.defaults.stripTrailingSlashes = false;
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state("home", {
                    url: "/",
                    templateUrl: 'app/pages/home/home.html',
                    controller: 'HomeCtrl'
                })
        }])


    .run(['$rootScope', '$state', '$stateParams', 'gmapsSvc',
        function ($rootScope, $state, $stateParams, gmapsSvc) {
            $rootScope.viewMap = true;

            $rootScope.changeView = function () {
                $rootScope.viewMap = !$rootScope.viewMap;
            };
            var authToken = localStorage.getItem('authToken');
            if (authToken && authToken != '') {
                $rootScope.authToken = authToken;
                $rootScope.loggedInUser = true;
            }
            else {
                $rootScope.loggedInUser = false;
            }

            gmapsSvc.refresh(42.697708, 23.321868);

            $rootScope.$watch('pois', function () {
                gmapsSvc.refresh(42.697708, 23.321868, $rootScope.pois);
            });


            $rootScope.$on("clicked", function () {

                // Run the gservice functions associated with identifying coordinates
                $scope.$apply(function () {
                    console.log(parseFloat(gservice.clickLat).toFixed(3))
                    $scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
                    $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
                    $scope.formData.htmlverified = "Nope (Thanks for spamming my map...)";
                });
            });

            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }])

    //todo rename to nav ctrl
    .controller('MainCtrl', ['$rootScope', '$scope', 'Login', '$state',
        function ($rootScope, $scope, Login, $state) {
            $scope.logout = function () {
                localStorage.removeItem("authToken");
                $rootScope.loggedInUser = false;
                $state.go('home');
            };
        }]);