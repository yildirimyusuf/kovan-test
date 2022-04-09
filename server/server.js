const { ApolloServer } = require('apollo-server');
const typeDefs = require('./src/schema');
const resolvers = require('./src/resolvers');
const BikeAPI = require('./src/datasources/bikeAPI');
const port = 4000;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    bikeAPI: new BikeAPI()
  })
});

server.listen(port).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});