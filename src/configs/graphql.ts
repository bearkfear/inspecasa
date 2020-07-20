import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";
import { ApolloLink, concat} from 'apollo-link';
const cache = new InMemoryCache();

const httpLink = createHttpLink({
	uri: process.env.VUE_APP_GRAPHQL_URL, // url
});


const authMiddleware = new ApolloLink((operation, forward) => {
	operation.setContext({
		headers: {
			authorization: localStorage.getItem('token') || null,
		}
	})
	return forward(operation);
})

export default new VueApollo({
	// client
	defaultClient: new ApolloClient({

		link: concat(authMiddleware, httpLink),

		cache,
		connectToDevTools: true,
		defaultOptions: {
			watchQuery: {
				fetchPolicy: "no-cache",
			},
			mutate: {
				fetchPolicy: "no-cache",
			},
			query: {
				fetchPolicy: "no-cache",
			}
		}
	})
});
