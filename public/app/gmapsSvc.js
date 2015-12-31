angular.module('gmapsModule', [])
    .factory('gmapsSvc', ['Poi', function (Poi) {

        var googleMapService = {};
        googleMapService.clickLat  = 0;
        googleMapService.clickLong = 0;
        var locations = [];

        var selectedLat = 39.50;
        var selectedLong = -98.35;

        googleMapService.refresh = function (latitude, longitude) {
            locations = [];

            selectedLat = latitude;
            selectedLong = longitude;

            Poi.getMany(function (res) {
                locations = convertToMapPois(res);
                initialize(latitude, longitude);
            });
        };

        var convertToMapPois = function (response) {

            var locations = [];

            for (var i = 0; i < response.length; i++) {
                var currentPoi = response[i];

                var contentString =
                    '<p><b>Name</b>: ' + currentPoi.name +
                    '<br><b>Type</b>: ' + currentPoi.type +
                    '<br><b>Coordinates</b>: ' + currentPoi.coordinates +
                    '</p>';

                locations.push({
                    latlon: new google.maps.LatLng(currentPoi.coordinates[1], currentPoi.coordinates[0]),
                    message: new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 320
                    }),
                    rating: currentPoi.rating,
                    workTime: currentPoi.workTime,
                    description: currentPoi.description
                });
            }

            return locations;
        };

        var initialize = function (latitude, longitude) {

            var myLatLng = {lat: selectedLat, lng: selectedLong};

            if (!map) {
                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 3,
                    center: myLatLng
                });
            }

            locations.forEach(function (n, i) {
                var marker = new google.maps.Marker({
                    position: n.latlon,
                    map: map,
                    title: "Big Map",
                    icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                });

                google.maps.event.addListener(marker, 'click', function (e) {
                    currentSelectedMarker = n;
                    n.message.open(map, marker);
                });
            });

            var initialLocation = new google.maps.LatLng(latitude, longitude);
            var marker = new google.maps.Marker({
                position: initialLocation,
                animation: google.maps.Animation.BOUNCE,
                map: map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
            });
            lastMarker = marker;


            map.panTo(new google.maps.LatLng(latitude, longitude));

            google.maps.event.addListener(map, 'click', function(e){
                var marker = new google.maps.Marker({
                    position: e.latLng,
                    animation: google.maps.Animation.BOUNCE,
                    map: map,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                });
                // When a new spot is selected, delete the old red bouncing marker
                if(lastMarker){
                    lastMarker.setMap(null);
                }

                // Create a new red bouncing marker and move to it
                lastMarker = marker;
                map.panTo(marker.position);
            });

        };

        google.maps.event.addDomListener(window, 'load',
            googleMapService.refresh(selectedLat, selectedLong));

        return googleMapService;
    }]);