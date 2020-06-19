import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex);
const vuexLocal = new VuexPersistence({
	key: "persist-inspecasa",
	storage: window.localStorage
})

interface State {
	user: {
		token: string | null;
		uid: string | null;
		id: number | null
	};
}

export default new Vuex.Store<State>({
	state: {
		user: {
			token: null,
			uid: null,
			id: null
		}
	},
	mutations: {
		SET_USER(state, user) {
			state.user = user;
		}
	},
	actions: {
	},
	modules: {
	},
	plugins: [vuexLocal.plugin]
});
