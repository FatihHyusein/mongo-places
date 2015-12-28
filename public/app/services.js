BoxingApp.factory('getUpdateDataSvc', [
    function () {
        function getSendData(data) {
            var sendData = {};

            for (var i in data) {
                if (data.hasOwnProperty(i) && i != '$promise' && i != '$resolved') {
                    sendData[i] = data[i];
                }
            }
            return sendData;
        }

        return {
            getSendData: getSendData
        };
    }]);