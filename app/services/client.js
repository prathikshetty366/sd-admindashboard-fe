import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

// Create an Apollo Client with the HTTP link and cache
const client = new ApolloClient({
  uri: "https://countries.trevorblades.com",
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
    },
    query: {
      fetchPolicy: "no-cache",
    },
  },
});

// Create an Apollo Client with the HTTP link and cache
const vehicleserviceclient = new ApolloClient({
  uri: "https://localhost.in",
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
    },
    query: {
      fetchPolicy: "no-cache",
    },
  },
});

export default { client, vehicleserviceclient };
