"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
// Define the schema using GraphQL SDL (Schema Definition Language)
const typeDefs = (0, apollo_server_1.gql) `
  type Task {
    id: ID!
    title: String!
    done: Boolean!
  }

  type Query {
    tasks: [Task!]!
    task(id: ID!): Task
  }

  type Mutation {
    createTask(title: String!): Task!
    updateTask(id: ID!, title: String, done: Boolean): Task!
  }
`;
exports.default = typeDefs;
