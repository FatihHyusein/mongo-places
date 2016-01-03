'use strict';

angular.module('boxing.users', ['ui.router'])

    .config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $urlRouterProvider
                    .when('/user/:id', '/users/:id')
                    .when('/users/:id', '/users/:id');


                $stateProvider
                    .state('users', {
                        abstract: true,
                        url: '/users',

                        templateUrl: 'app/pages/users/users.html',

                        resolve: {
                            users: ['User',
                                function (User) {
                                    //return User.getMany();
                                }]
                        },

                        controller: ['$scope', '$rootScope',
                            function ($scope, $rootScope) {
                                $scope.users = [];
                                $rootScope.pois = [];
                            }]
                    })

                    .state('users.list', {
                        url: '',
                        templateUrl: 'app/pages/users/users.list.html',
                        controller: ['$scope', '$rootScope', '$state', 'User',
                            function ($scope, $rootScope, $state, User) {
                                var currentPage = 0;
                                $scope.filters = {
                                    skip: 0,
                                    take: 5,
                                    sort: 'Rating',
                                    search: ''
                                };
                                $scope.getUsers = function (filter) {
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
                                    $scope.users = User.getMany($scope.filters);
                                };

                                $rootScope.search = function (searchInput) {
                                    $scope.filters.search = searchInput;
                                    $scope.getUsers();
                                };

                                $scope.getUsers();
                            }]
                    })

                    .state('users.detail', {
                        url: '/{id:[0-9]{1,4}}',

                        views: {
                            '': {
                                templateUrl: 'app/pages/users/details/users.detail.html',
                                controller: ['$scope', '$rootScope', '$stateParams', 'User', '$state',
                                    function ($scope, $rootScope, $stateParams, User, $state) {
                                        User.getOne({
                                            id: $stateParams.id
                                        }, function (res) {
                                            $scope.user = res;
                                            $rootScope.pois = res.favoritePlaces;
                                        });

                                        $scope.removeUser = function (userId) {
                                            User.delete({id: userId}, successDelete);

                                            function successDelete(response) {
                                                $state.go('users.list');
                                            }
                                        };

                                        $scope.removeFromFavorites = function (favPoiId) {
                                            User.update({
                                                    customPath: 'removeFromFavorites',
                                                    customPathName: favPoiId
                                                },
                                                function (res) {
                                                    $scope.user = res;
                                                    $rootScope.pois = res.favoritePlaces;
                                                }
                                            );
                                        }
                                    }
                                ]
                            }
                        }
                    })

                    .state('users.edit', {
                        url: '/{id:[0-9]{1,4}}',

                        views: {
                            '': {
                                templateUrl: 'app/pages/users/details/users.edit.html',
                                controller: ['$scope', '$stateParams', '$state', 'User', 'getUpdateDataSvc',
                                    function ($scope, $stateParams, $state, User, getUpdateDataSvc) {
                                        $scope.user = User.getOne({
                                            id: $stateParams.id
                                        });

                                        $scope.updateUser = function () {
                                            User.update({
                                                    id: $stateParams.id
                                                },
                                                $.param(getUpdateDataSvc.getSendData($scope.user)),
                                                successUpdateUser
                                            );

                                            function successUpdateUser() {

                                                //// Go back up. '^' means up one. '^.^' would be up twice, to the grandparent.
                                                $state.go("users.detail", {id: $stateParams.id});
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