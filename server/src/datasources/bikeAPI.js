const { RESTDataSource } = require('apollo-datasource-rest');

class BikeAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://announcekit-cdn.s3.amazonaws.com/';
  }
  
  async getVehicleStatus() {
    const response = await this.get('bikes.json');
    return response;
  }

  async getData(){
    const response = await this.get('bikes.json');
    return response.data;
  }

  async getAllbikes(){
    const response = await this.get('bikes.json');
    const bikes = response.data.bikes;
    return Array.isArray(bikes)? bikes: [];
  }

  async getBikeById({bikeId}){
    const response = await this.get('bikes.json');
    const bikes = response.data.bikes;
    return bikes.find(b => b.bike_id === bikeId);
  }
}

module.exports = BikeAPI;