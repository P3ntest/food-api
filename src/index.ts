import { readFileSync } from "fs";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Resolvers } from "./generated/graphql";
import {
  ingredientResolver,
  ingredientsResolver,
} from "./resolvers/ingredients";

const resolvers: Resolvers = {
  Query: {
    ingredients: ingredientsResolver,
    ingredient: ingredientResolver,
  },
};

const server = new ApolloServer<{}>({
  typeDefs: readFileSync("./src/schema.graphql", "utf-8"),
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
