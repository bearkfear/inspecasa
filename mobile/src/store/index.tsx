import { create, persist } from 'mobx-persist'
import AsyncStorage from '@react-native-community/async-storage'
import { schema } from './schema'
import { authStore } from './authStore'
import { StoreContext } from './context'
export { StoreProvider } from './Provider'
export { authStore } from './authStore'

const hydrate = create({ storage: AsyncStorage })
persist(schema)(authStore)
hydrate('authStore', authStore).then(state => {
  if (state) {
    // console.log(state)
    console.log('Reidratado!')
  }
  // TODO: Verificar se a auth token ainda é valida, caso nao, reautenticar
})

export default StoreContext
