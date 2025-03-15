import { gql } from 'apollo-server';

// Define the schema using GraphQL SDL (Schema Definition Language)
const typeDefs = gql`
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

export default typeDefs;
