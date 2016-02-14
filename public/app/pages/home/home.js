'use strict';

MongoPlacesApp.controller('HomeCtrl', ['$rootScope', '$scope', 'Poi', function ($rootScope, $scope, Poi) {
    $scope.selected = 'all';

    $scope.getMostLiked = function () {
        Poi.getMany({
                customPath: 'mostLiked',
                customPathName: $scope.selected
            },
            function (res) {
                $rootScope.pois = res[0].pois;
                $scope.poiTypes = res[0].types;
            });
    };

    $scope.getMostLiked();
}]);