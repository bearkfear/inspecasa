import Vue from "vue";
import Buefy from "buefy";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const BUEFY_OPTIONS = {
  defaultIconPack: "fas", // font awesome default icon pack
  defaultDialogCancelText: "Cancelar",
  defaultDayNames: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
  defaultMonthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ],
  defaultClockpickerHoursLabel: "Hora",
  defaultClockpickerMinutesLabel: "Minuto",
};

Vue.config.productionTip = false;
Vue.use(Buefy, BUEFY_OPTIONS);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
