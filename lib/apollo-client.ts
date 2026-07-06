import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({ uri: "/api/graphql" }),
    cache: new InMemoryCache(),
  });
};

export { createApolloClient };
