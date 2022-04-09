module.exports = {
    Query: {
        vehicle_status: (_, __, { dataSources }) => dataSources.bikeAPI.getVehicleStatus(),
        data: (_, __,{ dataSources}) => dataSources.bikeAPI.getData(),
        bikes: (_, __, { dataSources }) => dataSources.bikeAPI.getAllbikes(),
        bike: (_, { bike_id }, { dataSources }) => dataSources.bikeAPI.getBikeById({ bikeId: bike_id }),
    }
};