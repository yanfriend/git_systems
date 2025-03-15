"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
// Define the schema using GraphQL SDL (Schema Definition Language)
var typeDefs = (0, apollo_server_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Task {\n    id: ID!\n    title: String!\n    done: Boolean!\n  }\n\n  type Query {\n    tasks: [Task!]!\n    task(id: ID!): Task\n  }\n\n  type Mutation {\n    createTask(title: String!): Task!\n    updateTask(id: ID!, title: String, done: Boolean): Task!\n  }\n"], ["\n  type Task {\n    id: ID!\n    title: String!\n    done: Boolean!\n  }\n\n  type Query {\n    tasks: [Task!]!\n    task(id: ID!): Task\n  }\n\n  type Mutation {\n    createTask(title: String!): Task!\n    updateTask(id: ID!, title: String, done: Boolean): Task!\n  }\n"])));
exports.default = typeDefs;
var templateObject_1;
