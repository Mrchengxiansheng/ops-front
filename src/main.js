import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import base from "./assets/css/base.css";
import RemJs from "./assets/js/rem";

Vue.config.productionTip = false;
Vue.use(base);
Vue.use(RemJs);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
