
import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import state from './state';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: 'persist-inspecasa',
  storage: window.localStorage
});

export interface IState {
  user: {
    token:null | string;
    uid:null | string;
    id:null | string;
    funcao:null | string;
    nome:null | string;
    sobrenome:null | string;
    urlImg:null | string;
  };
}

export default new Vuex.Store<IState>({
  state,
  mutations,
  actions,
  modules: {
  },
  plugins: [vuexLocal.plugin]
});
