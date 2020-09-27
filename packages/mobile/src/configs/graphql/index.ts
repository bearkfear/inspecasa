import ApolloClient from 'apollo-boost'
import { getToken } from '@inspecasa/common/getToken'
import { authStore } from '@/store'
import { auth } from 'firebase/app'
import 'firebase/auth'

export const client = new ApolloClient({
  onError: (e) => {
    if (e.networkError) {
      alert('Verifique sua conexão!')

      console.log('Conection error ', e.networkError?.message)

      auth().signOut()
      authStore.setToken('')
      authStore.setIsAuth(false)
    } else if (e.graphQLErrors) {
      console.log('e.graphQLErrors', e.graphQLErrors)
    }
  },
  request: async (operation) => {
    console.log(`REQUEST ${operation.operationName}`)
    const { setContext } = operation
    const token = await getToken(authStore.token)
    authStore.setToken(token)

    setContext({
      headers: {
        authorization: token || null
      }
    })
  },
  uri: 'https://inspecasa.site'
})
