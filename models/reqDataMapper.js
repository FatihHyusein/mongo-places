exports.mapReqData = {
    postPoi: function (data/*{model: ***, reqData: ***}*/) {
        data.model.name = data.reqData.name;
        data.model.coordinates = data.reqData.coordinates;
        data.model.type = data.reqData.type;

        data.model.description = data.reqData.description;
        data.model.workTime = data.reqData.workTime;
        data.model.rating = 0;

        data.model.priceCategory = data.reqData.priceCategory;
        data.model.seatsCount = data.reqData.seatsCount;
        data.model.additionalInformation = data.reqData.additionalInformation;

        data.model.owner = data.userId;
    },

    putPoi: function (data/*{model: ***, reqData: ***}*/) {
        data.model.name = data.reqData.name;
        data.model.coordinates = data.reqData.coordinates;
        data.model.type = data.reqData.type;

        data.model.description = data.reqData.description;
        data.model.workTime = data.reqData.workTime;

        data.model.priceCategory = data.reqData.priceCategory;
        data.model.seatsCount = data.reqData.seatsCount;
        data.model.additionalInformation = data.reqData.additionalInformation;
    }
};