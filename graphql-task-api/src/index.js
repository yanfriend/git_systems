"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var schema_1 = require("./schema");
var resolvers_1 = require("./resolvers");
var server = new apollo_server_1.ApolloServer({
    typeDefs: schema_1.default,
    resolvers: resolvers_1.default,
});
server.listen({ port: 4000 }).then(function (_a) {
    var url = _a.url;
    console.log("Server ready at ".concat(url));
});
