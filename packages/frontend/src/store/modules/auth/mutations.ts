import S, { User } from "./types"
import { MutationTree } from "vuex"
import mutationTypes from "./mutationTypes";

const mutations: MutationTree<S> = { 
  [mutationTypes.ADD_LAST_EMAIL](state, email) { 
    state.lastEmail = email;
  },
  [mutationTypes.SET_USER] (state, user: User): void {
    if (user.token) { 
      state.authorized = true;
    } else { 
      state.authorized = false;
    }
    state.user = user;
  },
  [mutationTypes.SET_AUTHORIZATION](state, authorization: boolean) { 
    state.authorized = authorization;
  }
}

export default mutations;