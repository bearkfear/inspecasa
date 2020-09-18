import ApolloClient from 'apollo-boost'
import { authStore } from '@/store'
import { auth } from 'firebase'
import decode from 'jwt-decode'
export const client = new ApolloClient({
  onError: (e) => {
    console.log('Erro em request')
  },
  uri: 'http://localhost:5000/graphql',
  request: operation => {
    let token = authStore.token
    if (token) {
      const decodedToken = decode(token)
      if (decodedToken.exp * 1000 < Date.now()) {
        try {
          setTimeout(async () => {
            token = await auth().currentUser.getIdToken(true)
            authStore.setToken(token)
          }, 100)
        } catch (error) {
          alert('Tivemos um problema para verificar suas credenciais. Entre novamente!')
          authStore.clearStore()
        }
      }
      operation.setContext({
        headers: {
          authorization: token
        }
      })
    }
  }
})
