import { observable } from 'mobx'

export const authStore = observable({
  isAuth: false,
  uid: null,
  token: null,
  email: null,

  setEmail (email: string) {
    authStore.email = email
  },

  setIsAuth (isAuth: boolean) {
    authStore.isAuth = isAuth
  },

  setUid (uid: string) {
    authStore.uid = uid
  },

  setToken (tkn: string) {
    authStore.token = tkn
  },

  clearStore () {
    authStore.isAuth = null
    authStore.uid = null
    authStore.token = null
  }

})
