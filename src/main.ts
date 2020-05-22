import Vue from "vue";
import Buefy from "buefy";
import VueApollo from "vue-apollo";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import constants from "./constants";
import apolloProvider from "./configs/graphql";

Vue.config.productionTip = false;
Vue.use(VueApollo);
Vue.use(Buefy, constants.BUEFY_OPTIONS);

new Vue({
  router,
  store,
  apolloProvider,
  render: (h) => h(App),
}).$mount("#app");
