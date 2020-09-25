import ApolloClient from 'apollo-boost'
import { getToken } from '@inspecasa/common/getToken'

export const client = new ApolloClient({
  onError: (e) => {
    if (e.networkError) {
      alert('Verifique sua conexão!')
    } else if (e.graphQLErrors) {
      console.log('e.graphQLErrors', e.graphQLErrors)
    }
  },
  uri: 'http://localhost:5000/graphql',
  request: async ({ setContext }) => {
    const token = await getToken()
    setContext({
      headers: {
        authorization: token || null
      }
    })
  }
})
