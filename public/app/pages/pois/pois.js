'use strict';

angular.module('boxing.pois', ['ui.router'])

    .config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $urlRouterProvider
                    .when('/poi/:poiId', '/pois/:poiId')
                    .when('/pois/:poiId', '/pois/:poiId');


                $stateProvider
                    .state('pois', {
                        abstract: true,
                        url: '/pois',

                        templateUrl: 'app/pages/pois/pois.html',

                        resolve: {
                            pois: ['Poi',
                                function (Poi) {
                                    //return Poi.getMany();
                                }]
                        },

                        controller: ['$scope',
                            function ($scope) {
                                $scope.pois = [];
                            }]
                    })

                    .state('pois.list', {
                        url: '',
                        templateUrl: 'app/pages/pois/pois.list.html',
                        controller: ['$scope','$rootScope', '$state', 'Poi',
                            function ($scope,$rootScope, $state, Poi) {
                                var currentPage = 0;
                                $scope.filters = {
                                    skip: 0,
                                    take: 5,
                                    sort: 'Rating',
                                    search: ''
                                };
                                $scope.getPois = function (filter) {
                                    if (filter && filter.sort) {
                                        if ($scope.filters.sort == filter.sort) {
                                            if ($scope.filters.sort.indexOf('-') == 0) {
                                                $scope.filters.sort = filter.sort;
                                            }
                                            else {
                                                $scope.filters.sort = '-' + filter.sort;
                                            }
                                        }
                                        else {
                                            $scope.filters.sort = filter.sort;
                                        }
                                    }

                                    else if (filter && filter.page) {
                                        currentPage = (filter.page == 'next') ? ++currentPage : --currentPage;
                                    }

                                    $scope.filters.skip = $scope.filters.take * currentPage;
                                    $scope.pois = Poi.getMany($scope.filters);
                                };

                                $rootScope.search = function (searchInput) {
                                    $scope.filters.search = searchInput;
                                    $scope.getPois();
                                };

                                $scope.getPois();
                            }]
                    })

                    .state('pois.detail', {
                        url: '/{poiId:[0-9]{1,4}}',

                        views: {
                            '': {
                                templateUrl: 'app/pages/pois/details/pois.detail.html',
                                controller: ['$scope', '$stateParams', 'Poi', '$state',
                                    function ($scope, $stateParams, Poi, $state) {
                                        $scope.poi = Poi.getOne({
                                            poiId: $stateParams.poiId
                                        });

                                        $scope.removePoi = function (poiId) {
                                            Poi.delete({poiId: poiId}, successDelete);

                                            function successDelete(response) {
                                                $state.go('pois.list');
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    })

                    .state('pois.edit', {
                        url: '/{poiId:[0-9]{1,4}}',

                        views: {
                            '': {
                                templateUrl: 'app/pages/pois/details/pois.edit.html',
                                controller: ['$scope', '$stateParams', '$state', 'Poi', 'getUpdateDataSvc',
                                    function ($scope, $stateParams, $state, Poi, getUpdateDataSvc) {
                                        $scope.poi = Poi.getOne({
                                            poiId: $stateParams.poiId
                                        });

                                        $scope.updatePoi = function () {
                                            Poi.update({
                                                    poiId: $stateParams.poiId
                                                },
                                                $.param(getUpdateDataSvc.getSendData($scope.poi)),
                                                successUpdatePoi
                                            );

                                            function successUpdatePoi() {

                                                //// Go back up. '^' means up one. '^.^' would be up twice, to the grandparent.
                                                $state.go("pois.detail", {poiId: $stateParams.poiId});
                                            }
                                        };
                                    }
                                ]
                            }
                        }
                    })

                    .state('pois.add', {
                        url: '',

                        views: {
                            '': {
                                templateUrl: 'app/pages/pois/details/pois.add.html',
                                controller: ['$scope', '$stateParams', '$state', 'Poi',
                                    function ($scope, $stateParams, $state, Poi) {
                                        $scope.poi = {};

                                        $scope.add = function () {
                                            Poi.create({},
                                                $.param($scope.poi),
                                                successCreate
                                            );

                                            function successCreate(res) {
                                                $state.go("pois.detail", {poiId: res._id});
                                            }
                                        };
                                    }
                                ]
                            }
                        }
                    });
            }
        ]
    );