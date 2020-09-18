
import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import modules from "./modules";

// modulos

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: 'persist-inspecasa',
  storage: window.localStorage
});
export default new Vuex.Store({
  modules,
  plugins: [vuexLocal.plugin]
});
