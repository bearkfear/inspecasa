import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";

const cache = new InMemoryCache();

export default new VueApollo({
	// client
	defaultClient: new ApolloClient({

		link: createHttpLink({
			uri: "http://localhost:8000/graphql", // url
		}),
		cache,
		connectToDevTools: true,
		defaultOptions: {
			watchQuery: {
				fetchPolicy: 'no-cache',
			},
			mutate: {
				fetchPolicy: 'no-cache',
			},
			query: {
				fetchPolicy: 'no-cache',
			}
		}
	})
});
