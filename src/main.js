import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

Vue.config.productionTip = false;

function checkCookieName(name) {
  var match = document.cookie.match(
    new RegExp("(^| )" + name + "=([^;]+)")
  );
  if (match) return match[2];
  else return null;
}

const token = checkCookieName("Token");
if(token) {
  axios.defaults.headers.common['Authorization'] = "Token " + token;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
