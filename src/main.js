import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

Vue.config.productionTip = false;

if (store.getters.isLoggedIn) {
  axios.defaults.headers.common["Authorization"] = "Token " + store.getters.tokenCookie;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
