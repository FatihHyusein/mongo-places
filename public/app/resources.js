var url = "http://localhost:3000/";

BoxingApp.factory("Login", function ($resource) {
        return $resource(url + "logins/:id", {id: "@_id"},
            {
                'create': {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                },
                'delete': {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Auth-Token': localStorage.getItem("authToken")
                    }
                }
            }
        );
    })


    .factory("User", function ($resource) {
        return $resource(url + "users/:id/:customPath/:customPathName", {
                id: "@id",
                customPath: "@customPath",
                customPathName: '@customPathName'
            },
            {
                'create': {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                },
                'getMany': {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Bearer ' + localStorage.getItem("authToken")
                    },
                    isArray: true
                },
                'getOne': {
                    method: 'GET',
                    isArray: false,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Bearer ' + localStorage.getItem("authToken")
                    }
                },
                'update': {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Bearer ' + localStorage.getItem("authToken")
                    }
                },
                'delete': {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Bearer ' + localStorage.getItem("authToken")
                    }
                }
            }
        );
    })

    .factory("Poi", function ($resource) {
        return $resource(url + "pois/:poiId/:customPath/:customPathName", {
                poiId: "@poiId",
                customPath: "@customPath",
                customPathName: '@customPathName'
            },
            {
                'create': {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Bearer ' + localStorage.getItem("authToken")
                    }
                },
                'getMany': {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    isArray: true
                },
                'getOne': {
                    method: 'GET',
                    isArray: false,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Bearer ' + localStorage.getItem("authToken")
                    }
                },
                'update': {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Bearer ' + localStorage.getItem("authToken")
                    }
                },
                'delete': {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Bearer ' + localStorage.getItem("authToken")
                    }
                }
            }
        );
    });

