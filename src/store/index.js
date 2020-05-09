import Vue from "vue";
import Vuex from "vuex";
import login from "@/gateways/auth.js";
import axios from "axios";

Vue.use(Vuex);

function checkCookieName(name) {
  var match = document.cookie.match(
    new RegExp("(^| )" + name + "=([^;]+)")
  );
  if (match) return match[2];
  else return null;
}

function removeCookie(sKey, sPath, sDomain) {
  document.cookie = encodeURIComponent(sKey) + 
    "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + 
    (sDomain ? "; domain=" + sDomain : "") + 
    (sPath ? "; path=" + sPath : "");
}

export default new Vuex.Store({
  state: {
    status: "", 
    token: checkCookieName("Token") ||  "",
    user : {}
  },
  mutations: {
    auth_request(state){
      state.status = "loading"
    },
    auth_success(state, token, user){
      state.status = "success"
      state.token = token
      state.user = user
    },
    auth_error(state){
      state.status = "error"
    },
    logout(state){
      state.status = ""
      state.token = ""
    },
  },
  actions: {
    login({commit}, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request")
        if (user.password.length > 0 && user.username.length > 0) {
          login.post({
            username: user.username,
            password: user.password
          }) 
          .then( res => {
            const token = res.token;
            // const user = res.user;
            
            // SET COOKIE:
            let d = new Date();
            d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
            let expires = "expires=" + d.toUTCString();
            document.cookie =
              "Token=" + token + ";" + expires + ";path=/";
            
            axios.defaults.headers.common["Authorization"] = "Token " + token;

            // CHECK COOKIE:
            const tokenCookie = checkCookieName("Token");
            console.log("COOKIE TOKEN: " + tokenCookie );
            if (tokenCookie == null) {
              commit("auth_error")
              removeCookie("Token");
              reject("FAILED COOKIE");
            }

            commit("auth_success", token, user);
            resolve(res);
          })
          .catch( error => {
            commit("auth_error")
            removeCookie("Token");
            reject(error)
          })
        } else {
          commit("auth_error")
          reject("Wrong data entered");
        }
      });
    },
    logout({commit}){
      return new Promise((resolve) => {
        commit("logout")
        removeCookie("Token");
        delete axios.defaults.headers.common["Authorization"]
        resolve()
      })
    },
  },
  modules: {},
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
});
