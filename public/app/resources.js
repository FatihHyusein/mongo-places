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
        return $resource(url + "users/:id/", {id: "@id"},
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
                        'Auth-Token': localStorage.getItem("authToken"),
                        'Authorization': 'Bearer ' + localStorage.getItem("authToken")
                    },
                    isArray: true
                },
                'getOne': {
                    method: 'GET',
                    isArray: false,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Auth-Token': localStorage.getItem("authToken")
                    }
                },
                'update': {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Auth-Token': localStorage.getItem("authToken")
                    }
                },
                'delete': {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'admin-token': localStorage.getItem("authToken")
                    }
                }
            }
        );
    })

    .factory("PastMatch", function ($resource) {
        return $resource(url + "matches/pendingPastMatches/:id", {id: "@_id"},
            {
                'getMany': {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'admin-token': localStorage.getItem("authToken")
                    },
                    isArray: true
                }
            }
        );
    })


    .factory("Match", function ($resource) {
        return $resource(url + "matches/:id", {id: "@_id"},
            {
                'create': {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'admin-token': localStorage.getItem("authToken")
                    }
                },
                'getMany': {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Auth-Token': localStorage.getItem("authToken")
                    },
                    isArray: true
                },
                'getOne': {
                    method: 'GET',
                    isArray: false,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Auth-Token': localStorage.getItem("authToken")
                    }
                },
                'update': {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'admin-token': localStorage.getItem("authToken")
                    }
                },
                'delete': {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'admin-token': localStorage.getItem("authToken")
                    }
                }
            }
        );
    })

    .factory("UpdateWinner", function ($resource) {
        return $resource(url + "matches/:id/updateWinner", {id: "@_id"},
            {
                'update': {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'admin-token': localStorage.getItem("authToken")
                    }
                }
            }
        );
    })

    .factory("CancelMatch", function ($resource) {
        return $resource(url + "matches/:id/cancelMatch", {id: "@_id"},
            {
                'update': {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'admin-token': localStorage.getItem("authToken")
                    }
                }
            }
        );
    })


    .factory("Prediction", function ($resource) {
        return $resource(url + "matches/:matchId/predictions/:predictionId", {
                matchId: "@matchId",
                predictionId: "@predictionId"
            },
            {
                'create': {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Auth-Token': localStorage.getItem("authToken")
                    }
                },
                'getMany': {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Auth-Token': localStorage.getItem("authToken")
                    },
                    isArray: true
                },
                'getOne': {
                    method: 'GET',
                    isArray: false,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Auth-Token': localStorage.getItem("authToken")
                    }
                },
                'update': {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Auth-Token': localStorage.getItem("authToken")
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
    });