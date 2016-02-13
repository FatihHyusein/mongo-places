MongoPlacesApp
    .directive('poisList', function () {
        return {
            templateUrl: 'app/pages/pois/pois.list.html',
            controller: ['$scope', '$rootScope', '$state', 'Poi',
                function ($scope, $rootScope, $state, Poi) {

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
                        Poi.getMany($scope.filters, function (res) {
                            $rootScope.pois = res;
                        });
                    };

                    $rootScope.search = function (searchInput) {
                        $scope.filters.search = searchInput;
                        $scope.getPois();
                    };

                    $scope.getPois();
                }]
        };
    });