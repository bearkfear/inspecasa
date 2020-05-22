import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";

export default new VueApollo({
  // client
  defaultClient: new ApolloClient({

    link: createHttpLink({
      uri: "http://localhost:8000/graphql", // url
    }),

    cache: new InMemoryCache(),

    connectToDevTools: true,

  })
});
