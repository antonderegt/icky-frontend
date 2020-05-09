import Vue from "vue";
import Vuex from "vuex";
import login from "@/gateways/auth.js";
import api from "@/gateways/api.js";
import axios from "axios";

Vue.use(Vuex);

function checkCookieName(name) {
  var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) return match[2];
  else return null;
}

function removeCookie(sKey, sPath, sDomain) {
  document.cookie =
    encodeURIComponent(sKey) +
    "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
    (sDomain ? "; domain=" + sDomain : "") +
    (sPath ? "; path=" + sPath : "");
}

export default new Vuex.Store({
  state: {
    status: "",
    token: checkCookieName("Token") || "",
    user: {},
    problems: new Map()
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token, user) {
      state.status = "success";
      state.token = token;
      state.user = user;
    },
    auth_error(state) {
      state.status = "error";
    },
    get_problems_success(state, problems) {
      state.status = "success";
      problems.map(problem => {
        if (state.problems.has(problem.pk)) {
          console.log("Problem already exists");
        } else {
          state.problems.set(problem.pk, {
            problem: problem.problem,
            categories: new Map()
          });
        }
      });
    },
    get_problem_success(state, problem) {
      state.status = "success";
      state.problems.set(problem.pk, {
        problem: problem.problem,
        categories: new Map()
      });
    },
    get_categories_success(state, cats) {
      state.status = "success";
      const problemPk = cats.problemPk;
      const categories = cats.categories;
      categories.map(cat => {
        state.problems
          .get(parseInt(problemPk))
          .categories.set(cat.pk, { category: cat.category, items: new Map() });
      });
    },
    get_items_success(state, items) {
      state.status = "success";
      state.items = items;
    },
    get_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    }
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        if (user.password.length > 0 && user.username.length > 0) {
          login
            .post({
              username: user.username,
              password: user.password
            })
            .then(res => {
              const token = res.token;
              // const user = res.user;

              // SET COOKIE:
              let d = new Date();
              d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
              let expires = "expires=" + d.toUTCString();
              document.cookie = "Token=" + token + ";" + expires + ";path=/";

              axios.defaults.headers.common["Authorization"] = "Token " + token;

              // CHECK COOKIE:
              const tokenCookie = checkCookieName("Token");
              if (tokenCookie == null) {
                commit("auth_error");
                removeCookie("Token");
                reject("FAILED COOKIE");
              }

              commit("auth_success", token, user);
              resolve(res);
            })
            .catch(error => {
              commit("auth_error");
              removeCookie("Token");
              reject(error);
            });
        } else {
          commit("auth_error");
          reject("Wrong data entered");
        }
      });
    },
    logout({ commit }) {
      return new Promise(resolve => {
        commit("logout");
        removeCookie("Token");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
    getProblems({ commit }) {
      return new Promise((resolve, reject) => {
        api
          .get("/")
          .then(res => {
            commit("get_problems_success", res.data);
            resolve(res.data);
          })
          .catch(error => {
            commit("get_error");
            reject(error);
          });
      });
    },
    getProblem({ commit }, pk) {
      return new Promise((resolve, reject) => {
        api
          .get(`/${pk}`)
          .then(res => {
            commit("get_problem_success", res);
            resolve(res);
          })
          .catch(error => {
            commit("get_error");
            reject(error);
          });
      });
    },
    getCategories({ commit }, pk) {
      return new Promise((resolve, reject) => {
        api
          .get(`/${pk}/categories`)
          .then(res => {
            const cats = {
              problemPk: pk,
              categories: res
            };
            commit("get_categories_success", cats);
            resolve(res);
          })
          .catch(error => {
            commit("get_error");
            reject(error);
          });
      });
    },
    getItems({ commit }, problem) {
      return new Promise((resolve, reject) => {
        api
          .get(`/${problem.problemPk}/${problem.catPk}`)
          .then(res => {
            const items = {
              problemPk: problem.problemPk,
              catPk: problem.catPk,
              items: res
            };
            commit("get_items_success", items);
            resolve(res);
          })
          .catch(error => {
            commit("get_error");
            reject(error);
          });
      });
    }
  },
  modules: {},
  getters: {
    isLoggedIn: state => !!state.token,
    tokenCookie: state => state.token,
    authStatus: state => state.status,
    problems: state => state.problems,
    categories: state => state.categories,
    items: state => state.items
  }
});
