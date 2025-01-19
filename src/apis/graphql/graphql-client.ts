import { GraphQLClient } from "graphql-request";

const endpoint = `https://dev-foudrecipes.pantheonsite.io/graphql`;
export const client = new GraphQLClient(endpoint);