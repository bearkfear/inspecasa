import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";
import getToken from "@/utils/getToken";
import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({
	uri: process.env.VUE_APP_GRAPHQL_URL, // url
});


const authLink = setContext(async (_, { headers }) => {
  const token = await getToken(localStorage.getItem("token"));

  return {
    headers: {
      ...headers,
      authorization: token || null
    }
  };
});

export const http = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
	defaultOptions: {
		watchQuery: { fetchPolicy: "no-cache" },
		mutate: { fetchPolicy: "no-cache" },
		query: { fetchPolicy: "no-cache" }
	}
})

export default new VueApollo({
	// client
	defaultClient: http
});
