const { gql } = require('apollo-server');

// build schemas based on json structure
const typeDefs = gql`
  type VehicleStatus {
    last_updated: String
    ttl: String
    data: Data
  }
  type Data{
      bikes: [Bike]
  }
  type Bike {
    bike_id: ID!
    lat: Float
    lon: Float
    is_reserved: Boolean!
    is_disabled: Boolean!
    vehicle_type: String
  }
  type Query {
    vehicle_status: VehicleStatus
    data: Data
    bikes: [Bike]
    bike(bike_id: ID!) : Bike
  }
`;

module.exports = typeDefs;