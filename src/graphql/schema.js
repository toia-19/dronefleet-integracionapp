const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Flight {
    id: ID!
    droneId: Int!
    status: String!
    createdAt: String!
  }

  type Query {
    flights(status: String): [Flight]
    flight(id: ID!): Flight 
  }

  type Mutation {
    createFlight(droneId: Int!, status: String!): Flight
  }
`;

module.exports = typeDefs;
